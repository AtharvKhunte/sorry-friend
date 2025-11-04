import { motion } from "framer-motion";
import { useState } from "react";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { FaHeart } from "react-icons/fa";
import sorryAnimation from "./sorry.json";       // Lottie 1: Apology
import friendshipAnimation from "./friendship.json"; // Lottie 2: Friendship ending

export default function App() {
  const [forgiven, setForgiven] = useState(false);
  const [musicReady, setMusicReady] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // 🌌 Initialize tsparticles
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  // 🎧 Start background music manually (mobile-safe)
  const startMusic = () => {
    const audio = document.getElementById("bg-music");
    if (audio) {
      audio.volume = 0;
      audio.play().catch(() => {});
      const fadeIn = setInterval(() => {
        if (audio.volume < 0.4) audio.volume += 0.05;
        else clearInterval(fadeIn);
      }, 200);
      setMusicReady(true);
    }
  };

  // 🎉 Handle forgiveness event
  const handleForgive = () => {
    const audio = document.getElementById("bg-music");
    if (audio && !musicReady) {
      audio.volume = 0;
      audio.play().catch(() => {});
      const fadeIn = setInterval(() => {
        if (audio.volume < 0.4) audio.volume += 0.05;
        else clearInterval(fadeIn);
      }, 200);
      setMusicReady(true);
    }

    confetti({
      particleCount: 200,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#a2d2ff", "#ffc8dd", "#cdb4db", "#ffafcc"],
    });

    setForgiven(true);

    // 🎬 show friendship Lottie popup after 2.5s
    setTimeout(() => setShowPopup(true), 2500);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center p-4 overflow-hidden">

      {/* 🌌 Background Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            color: { value: ["#a2d2ff", "#ffc8dd", "#cdb4db"] },
            links: { color: "#ffc8dd", distance: 120, enable: true, opacity: 0.4, width: 1 },
            move: { enable: true, speed: 1.2, direction: "none", outModes: { default: "out" } },
            number: { value: 30, density: { enable: true, area: 800 } },
            opacity: { value: 0.6 },
            shape: { type: "circle" },
            size: { value: { min: 2, max: 5 } },
            twinkle: {
              particles: { enable: true, color: "#ffd6e0", frequency: 0.1, opacity: 0.8 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 -z-10"
      />

      {/* 🎧 Hidden Audio */}
      <audio id="bg-music" loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* 🎵 Play Music Button (mobile safe) */}
      {!musicReady && !forgiven && (
        <motion.button
          onClick={startMusic}
          whileHover={{ scale: 1.05 }}
          className="bg-pink-400 text-white px-4 py-2 rounded-full mb-6 shadow-md"
        >
          🎵 Play Music
        </motion.button>
      )}

      {/* 💬 Main UI */}
      {!forgiven ? (
        <motion.div
          className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-lg z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <Lottie animationData={sorryAnimation} loop className="w-52 mx-auto mb-4" />
          <motion.h1
            className="text-4xl md:text-5xl font-semibold text-blue-700 mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            I’m really sorry 😔
          </motion.h1>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            I spoke rudely earlier, and I truly feel bad about it.  
            You didn’t deserve that — you’ve always been a wonderful friend.  
            I hope you can forgive me 💙
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleForgive}
            className="bg-gradient-to-r from-blue-400 to-pink-400 text-white px-8 py-3 rounded-full shadow-lg font-bold"
          >
            It’s okay 💫
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-lg max-w-lg text-gray-700 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Lottie animationData={sorryAnimation} loop={false} className="w-48 mx-auto mb-4" />
          <h2 className="text-3xl font-semibold text-green-600 mb-2">
            Thank you for forgiving me 🙏
          </h2>
          <p className="mb-4">
            You’ve always been understanding and kind.  
            I really appreciate it — I’ll make sure I’m more thoughtful from now on.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
          >
            <h3 className="text-2xl text-pink-500 mt-6 font-semibold">
              Friends Forever 💞
            </h3>
            <motion.div
              className="flex justify-center mt-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FaHeart className="text-pink-400 text-3xl" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* 🎬 Friendship Lottie Pop-Up */}
      {showPopup && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 relative shadow-2xl max-w-sm mx-4 flex flex-col items-center"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-3 text-gray-500 text-xl hover:text-gray-700"
            >
              ✖
            </button>
            <Lottie
              animationData={friendshipAnimation}
              loop={false}
              className="w-64 h-64"
            />
            <p className="text-center mt-3 text-gray-700 font-semibold">
              Thanks for being an awesome friend 💖
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* 🎞️ Cinematic Scrolling Credits */}
      {forgiven && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 flex flex-col items-center text-gray-600 text-sm z-40 pb-3"
          initial={{ opacity: 0, y: 60 }}
          animate={{ y: [60, 0, -60], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 10, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
        >
          <p className="text-gray-500">Created with care by Atharv 💫</p>
          <p className="text-gray-400 italic">Dedicated to my friend Divya aka Koomi  💙</p>
        </motion.div>
      )}
    </div>
  );
}
