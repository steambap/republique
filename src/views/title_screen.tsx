const TitleScreen = () => {
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0"
      style={{ backgroundImage: "url(title.webp)" }}
    >
      <div className="ml-28 mt-24 text-left text-white">
        <h1
          className="text-8xl"
          style={{ textShadow: "1px 1px 2px hsl(180,90%,60%)" }}
        >
          民国时代
        </h1>
        <h3 className="text-5xl tracking-tighter">Age of Repulic 1936</h3>
      </div>
      <div className="fixed right-20 bottom-20 flex flex-col">
        <button className="button text-xl mb-10">开始新游戏</button>
        <button className="button text-xl mb-10">快速开始</button>
        <button className="button text-xl mb-10">读取进度</button>
        <button className="button text-xl mb-10">设置</button>
        <button className="button text-xl mb-10">许可</button>
        <button className="button text-xl">退出游戏</button>
      </div>
    </div>
  );
};

export default TitleScreen;
