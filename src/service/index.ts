import { db } from "@/lib/firebase";
import {
  getDocs,
  orderBy,
  query,
  collection,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";

export async function getCurrentUser(uid: string) {
  if (!uid) return;
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data: any = docSnap.data();
    return data;
  } else {
    console.log("No such document!");
  }
}

export async function loginThingsBoard() {
  try {
    const response = await fetch("https://thingsboard.cloud/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: process.env.NEXT_PUBLIC_USERNAME_THINGSBOARD,
        password: process.env.NEXT_PUBLIC_PASSWORD_THINGSBOARD,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to login, please check your credentials.");
    }

    const data = await response.json();
    const jwtToken = data.token;

    return jwtToken;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getDevices() {
  try {
    const q = query(collection(db, "devices"), orderBy("created_at", "desc"));
    const snapshot = await getDocs(q);
    const data: any = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error getting devices: ", error);
  }
}

export async function getDeviceById(id: any) {
  const docRef = doc(db, "devices", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const entityId = data.entityId;
    return entityId;
  } else {
    console.log("No such document!");
  }
}

export async function getUsers() {
  try {
    const q = query(collection(db, "users"));
    const snapshot = await getDocs(q);
    const data: any = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error getting devices: ", error);
  }
}

const token = await loginThingsBoard();

export function LatestTelemetryPowermeter() {
  const [powermeter, setPowermeter] = useState<any>([]);

  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        if (!token) {
          console.error("Token tidak ditemukan!");
          return;
        }

        const ws = new WebSocket(
          `wss://thingsboard.cloud/api/ws/plugins/telemetry?token=${token}`
        );

        ws.onopen = () => {
          console.log("WebSocket connected");
          ws.send(
            JSON.stringify({
              tsSubCmds: [
                {
                  entityType: "DEVICE",
                  entityId: "e2d1b230-ec35-11ef-9389-77a321a8daf2",
                  scope: "LATEST_TELEMETRY",
                  cmdId: 10,
                  type: "TIMESERIES",
                },
              ],
            })
          );
        };

        ws.onmessage = (message) => {
          const response = JSON.parse(message.data);
          console.log("Telemetry received");

          setPowermeter(response.data);

          // Simpan data ke Firestore setiap 24 jam pada jam 00:00 WIB
          scheduleFirestoreSave(response.data.Value12[0][1]);
        };

        ws.onerror = (error) => console.error("WebSocket error:", error);
        ws.onclose = () => console.log("WebSocket disconnected");

        return () => ws.close();
      } catch (error) {
        console.error("Error connecting to WebSocket:", error);
      }
    };

    connectWebSocket();
  }, []);

  const scheduleFirestoreSave = (value: any) => {
    const now = new Date();
    const wibOffset = 7 * 60; // WIB adalah UTC+7
    const targetTime = new Date(now);

    // Set target time to 00:00 WIB
    targetTime.setHours(0, 0, 0, 0);
    targetTime.setMinutes(targetTime.getMinutes() + wibOffset);

    // Jika waktu sekarang sudah lewat 00:00 WIB, set target ke hari berikutnya
    if (now > targetTime) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeUntilTarget = targetTime.getTime() - now.getTime();

    setTimeout(() => {
      saveActivePowerPerDay(value);

      // Set interval untuk setiap 24 jam setelahnya
      setInterval(() => saveActivePowerPerDay(value), 24 * 60 * 60 * 1000);
    }, timeUntilTarget);
  };

  const saveActivePowerPerDay = async (value: any) => {
    try {
      const docRef = await addDoc(collection(db, "powermeterData"), {
        value: value,
        timestamp: new Date(),
      });
      console.log("Data saved to Firestore with ID:", docRef.id);
    } catch (error) {
      console.error("Error saving to Firestore:", error);
    }
  };

  return powermeter;
}

export function LatestTelemetryHidrometri() {
  const [hidrometri, setHidrometri] = useState<any>([]);

  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        if (!token) {
          console.error("Token tidak ditemukan!");
          return;
        }

        const ws = new WebSocket(
          `wss://thingsboard.cloud/api/ws/plugins/telemetry?token=${token}`
        );

        ws.onopen = () => {
          console.log("WebSocket connected");
          ws.send(
            JSON.stringify({
              tsSubCmds: [
                {
                  entityType: "DEVICE",
                  entityId: "50826780-ec35-11ef-9389-77a321a8daf2",
                  scope: "LATEST_TELEMETRY",
                  cmdId: 20,
                  type: "TIMESERIES",
                },
              ],
            })
          );
        };

        ws.onmessage = (message) => {
          const response = JSON.parse(message.data);
          console.log("Telemetry received");

          setHidrometri(response.data);
          // saveDataToFirestoreHidrometri(
          //   response.data.waterLevel[0][1],
          //   response.data.VelocityofFlow[0][1]
          // );
        };

        ws.onerror = (error) => console.error("WebSocket error:", error);
        ws.onclose = () => console.log("WebSocket disconnected");

        return () => ws.close();
      } catch (error) {
        console.error("Error connecting to WebSocket:", error);
      }
    };

    connectWebSocket();
  }, []);

  return hidrometri;
}

const saveDataToFirestorePowermeter = async (
  activePower: any,
  speedTurbin: any
) => {
  try {
    const docRef = await addDoc(collection(db, "powermeterHistory"), {
      activePower: activePower,
      speedTurbin: speedTurbin,
      timestamp: serverTimestamp(),
    });
    console.log("Data saved to Firestore with ID: ", docRef.id);
  } catch (error) {
    console.error("Error saving data to Firestore:", error);
  }
};

const saveDataToFirestoreHidrometri = async (
  waterLevel: any,
  velocityOfFlow: any
) => {
  try {
    const docRef = await addDoc(collection(db, "hidrometriHistory"), {
      waterLevel: waterLevel,
      velocityOfFlow: velocityOfFlow,
      timestamp: serverTimestamp(),
    });
    console.log("Data saved to Firestore with ID: ", docRef.id);
  } catch (error) {
    console.error("Error saving data to Firestore:", error);
  }
};
