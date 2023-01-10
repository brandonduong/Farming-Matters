export const Game = () => {
    return (
        <>
        <InfoHeader user={user} money={money} season={season} turn={turn} setSeason={setSeason} setTurn={setTurn} />
      <div className="canvas-container">
        <Canvas camera={{ fov: 70, position: [0, 5, 5] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 50, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <FarmGrid position={[0, 0, 0]} turn={turn} money={money} setMoney={setMoney} />
          <OrbitControls
            target={[0, 0, 0]}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            maxDistance={10}
            enablePan={false}
          />
        </Canvas>

      </div>
      <Consultant decisionType = {decisionType} />
      <Inventory></Inventory>
      <Shop money={money} setMoney={setMoney}></Shop>
      </>
    );
}