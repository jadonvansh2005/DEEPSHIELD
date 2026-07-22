import { create } from "zustand";

export const useStore = create((set) => ({
  // 🔐 AUTH STATE
  systemName: "",
  systemId: "",
  isAuthenticated: false,
  isBlocked: false, // 🔥 NEW (CRITICAL)

  // 📊 UI STATE
  detection: null,
  logs: [],
  history: [],

  // -------------------------
  // 🔐 LOGIN / REGISTER
  // -------------------------
  register: (name, id) => {
    localStorage.setItem("systemName", name);
    localStorage.setItem("systemId", id);
    localStorage.setItem(`isBlocked_${id}`, "false");

    set({
      systemName: name,
      systemId: id,
      isAuthenticated: true,
      isBlocked: false,
    });
  },

  // -------------------------
  // 🔄 LOAD USER (ON REFRESH)
  // -------------------------
  // loadUser: () => {
  //   const name = localStorage.getItem("systemName");
  //   const id = localStorage.getItem("systemId");
  //   const blocked = localStorage.getItem(`isBlocked_${id}`) === "true";

  //   const savedLogs = JSON.parse(
  //     localStorage.getItem(`logs_${id}`) || "[]"
  //   );

  //   if (name && id) {
  //     set({
  //       systemName: name,
  //       systemId: id,
  //       isAuthenticated: false, // Note: You can choose to auto-authenticate or require re-login
  //       isBlocked: blocked,
  //       logs: savedLogs,
  //     });
  //   }
  // },


  loadUser: () => {
    const name = localStorage.getItem("systemName");
    const id = localStorage.getItem("systemId");

    if (!name || !id) return;

    const savedLogs = JSON.parse(
      localStorage.getItem(`logs_${id}`) || "[]"
    );

    const blocked =
      localStorage.getItem(`isBlocked_${id}`) === "true";

    set({
      systemName: name,
      systemId: id,
      isAuthenticated: false, // ✅ IMPORTANT FIX
      logs: savedLogs,       // ✅ load only this system logs
      isBlocked: blocked,
    });
  },




  setSystem: (id) => {
    const savedLogs = JSON.parse(
      localStorage.getItem(`logs_${id}`) || "[]"
    );

    const isBlocked =
      localStorage.getItem(`isBlocked_${id}`) === "true";

    set({
      systemId: id,
      logs: savedLogs,
      isBlocked,
    });
  },

  // -------------------------
  // 📡 DETECTION + GRAPH
  // -------------------------
  setDetection: (data) => {
    set((state) => {
      // 🔥 Normalize score (backend gives 0–1 mostly)
      const safeScore =
        typeof data.final_score === "number"
          ? data.final_score > 1
            ? data.final_score / 100
            : data.final_score
          : 0;

      const newHistoryPoint = {
        time: new Date().toLocaleTimeString(),
        score: safeScore,
      };
      const updatedHistory = [...state.history, newHistoryPoint].slice(-15);

      // 🔥 BLOCK LOGIC (CORE SYSTEM BEHAVIOR)
      let isBlocked = state.isBlocked;

      if (data.action === "BLOCK") {
        isBlocked = true;
        localStorage.setItem(`isBlocked_${state.systemId}`, "true");
      }

      return {
        detection: {
          ...data,

          video_score:
            data.video_score ??
            data.video ??
            data.videoScore ??
            0,

          audio_score:
            data.audio_score ??
            data.audio ??
            data.audioScore ??
            0,

          multimodal_score:
            data.multimodal_score ??
            data.final_score ??
            0,
        },
        history: updatedHistory,
        isBlocked,
      };
    });
  },

  // -------------------------
  // 📜 LOGGING SYSTEM
  // -------------------------
  addLog: (log) =>
    set((state) => {
      const systemId = state.systemId;

      if (!systemId) return state; // safety check

      const newLog = {
        ...log,
        systemId, // 🔥 CRITICAL FIX
      };

      const updatedLogs = [newLog, ...state.logs];

      const key = `logs_${systemId}`;

      localStorage.setItem(
        `logs_${systemId}`,
        JSON.stringify(updatedLogs.slice(0, 50))
      );
      return { logs: updatedLogs };
    }),

  // -------------------------
  // 🚫 FORCE BLOCK (MANUAL / AGENT)
  // -------------------------
  blockSystem: () => {
    localStorage.setItem("isBlocked", "true");

    set({
      isBlocked: true,
    });
  },

  // -------------------------
  // 🔓 LOGOUT
  // -------------------------
  logout: () => {
    localStorage.clear();

    set({
      systemName: "",
      systemId: "",
      isAuthenticated: false,
      isBlocked: false,
      detection: null,
      logs: [],
      history: [],
    });
  },
}));