// import ProtectedRoute from "@/components/HOC/ProtectedRoute";

import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Dashboard() {
  return (
   
      <div>
        <Header/>
        <div>
          <ul className="flex justify-center items-center h-22 cursor-pointer gap-6 text-md font-bold">
            <li>2024</li>
            <li>2025</li>
            <li>2026</li>
            <li>2027</li>
          </ul>
        </div>
        <h1>Dashboard</h1>
        <p>This page is protected and only accessible if logged in.</p>
        <Card/> <br />
        <Footer/>
      </div>
  
  );
}
