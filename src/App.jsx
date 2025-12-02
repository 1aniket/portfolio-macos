import { Welcome, Navbar } from "#components"
import LoadingScreen from "#components/LoadingScreen";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

function App() {
  
   const [loading, setLoading] = useState(true);
  const mainRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );
    }
  }, [loading]);
  return (

  <main>
    {loading && <LoadingScreen onFinish={() => {
  console.log("done");
  setLoading(false);
}} />}
    {!loading && <Welcome />}
    {!loading && <Navbar />}
    
  </main>
      
    
  )
}

export default App
