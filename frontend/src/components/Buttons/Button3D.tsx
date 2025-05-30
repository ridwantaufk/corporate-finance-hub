import { useNeumorph } from "@/contexts/NeumorphContext";

export default function Button3D() {
  const { isNeumorphism, toggleNeumorphism } = useNeumorph();

  return (
    <div className="container">
      <label className="switch">
        <input
          className="togglesw"
          type="checkbox"
          checked={isNeumorphism}
          onChange={toggleNeumorphism}
        />
        <div className="indicator left">
          <span className="text-3d">3D</span>
        </div>
        <div className="indicator right">
          <span className="text-2d">2D</span>
        </div>
        <div className="button"></div>
      </label>
    </div>
  );
}
