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
import firebase from "firebase/app";
import { useState, useEffect } from "react";

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
          saveDataToFirestorePowermeter(
            response.data.Value12[0][1],
            response.data.Value20[0][1]
          );
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
          saveDataToFirestoreHidrometri(
            response.data.waterLevel[0][1],
            response.data.VelocityofFlow[0][1]
          );
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
