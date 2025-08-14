"use client";

export function NotFound() {
  return (
    <section className="bg-white font-serif min-h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full text-center">
            <div className="bg-[url(/panda.gif)] h-30 bg-center bg-no-repeat bg-contain mt-[-20vh]"></div>

            <div className="">
              <h3 className="text-5xl text-black font-bold mb-4">
                页面未开发完毕
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
