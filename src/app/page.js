import CropForm from "@/component/CropForm";

let imgLink1 = "https://images.unsplash.com/photo-1628352081506-83c43123ed6d";
let imgLink2 =
  "https://images.pexels.com/photos/12903472/pexels-photo-12903472.jpeg";

export default function Home() {
  return (
    <div className="text-color p-0">
      <main>
        <section
          style={{
            backgroundImage: `url(${imgLink1})`,
            backgroundRepeat: "no-repeat",
          }}
          className="h-screen min-h-[866px] bg-cover bg-center  "
        >
          <div className="max-w-[1080px] mx-auto p-12">
            <div
              className="lg:w-6/12 md:w-full sm:w-full p-10 rounded-xl"
              style={{
                backgroundColor: "rgba(0,0,0, 0.6)",
              }}
            >
              <h1 className="text-3xl font-semibold  text-[#ffffff] mb-6">
                Crop leaf disease detection using image processing
              </h1>

              <CropForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
