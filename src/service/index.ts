import { db } from "@/lib/firebase";
import {
  getDocs,
  orderBy,
  query,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
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

export function LatestTelemetry(deviceId: any, cmdId: any) {
  const [data, setData] = useState<any>([]);

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

        // const entityId = await getDeviceById(deviceId);

        ws.onopen = () => {
          console.log("WebSocket connected");
          ws.send(
            JSON.stringify({
              tsSubCmds: [
                {
                  entityType: "DEVICE",
                  entityId: deviceId,
                  scope: "LATEST_TELEMETRY",
                  cmdId: cmdId,
                  type: "TIMESERIES",
                },
              ],
            })
          );
        };

        ws.onmessage = (message) => {
          const response = JSON.parse(message.data);
          console.log("Telemetry received:", response.data);

          setData(response.data);
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

  return data;
}
