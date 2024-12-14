import { db } from "@/lib/firebase";
import {
  getDocs,
  orderBy,
  query,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
type TelemetryData = Record<string, any>;

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

const token = await loginThingsBoard();

export function useTelemetryData(deviceId: any, cmdId: any) {
  const [data, setData] = useState<TelemetryData[]>([]);

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

        const entityId = await getDeviceById(deviceId);

        ws.onopen = () => {
          console.log("WebSocket connected");
          ws.send(
            JSON.stringify({
              tsSubCmds: [
                {
                  entityType: "DEVICE",
                  entityId: entityId,
                  scope: "LATEST_TELEMETRY",
                  cmdId: cmdId,
                  type: "TIMESERIES",
                },
              ],
              historyCmds: [],
              attrSubCmds: [],
            })
          );
        };

        ws.onmessage = (message) => {
          const response = JSON.parse(message.data);
          console.log("Telemetry data received:", response.data);

          if (response.data) {
            const suhu = response.data.suhu ? response.data.suhu[0][1] : null;
            const temperature = response.data.temperature
              ? response.data.temperature[0][1]
              : null;

            if (suhu !== null && temperature !== null) {
              setData((prevData) => [
                ...prevData,
                {
                  suhu: suhu,
                  temperature: temperature,
                },
              ]);
            }
          }
        };

        ws.onerror = (error) => console.error("WebSocket error:", error);
        ws.onclose = () => console.log("WebSocket disconnected");

        return () => ws.close();
      } catch (error) {
        console.error("Error connecting to WebSocket:", error);
      }
    };

    connectWebSocket();
  }, [deviceId, cmdId]);

  return data;
}
