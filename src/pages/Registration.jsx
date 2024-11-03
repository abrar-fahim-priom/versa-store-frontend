import RegistrationForm from "../Components/Account/RegistrationForm.jsx";
import NavBar from "../Components/Header/NavBar.jsx";
import loginImage from "../images/login-image.jpg";

export default function Registration() {
  return (
    <>
      <div className="bg-neutral-100 z-10 dark:bg-gray">
        <NavBar />

        <main>
          <div data-nc-id="PageLogin" className="container mt-3 xl:mt-24">
            <div className="pb-24 pt-2">
              <div className="flex flex-col md:flex-row">
                <div className="order-2 basis-1/2 md:order-1 relative z-0">
                  <div className="relative aspect-video  bg-neutral-300 md:aspect-auto lg:aspect-[8/7]">
                    <img
                      src={loginImage}
                      alt="about us"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="order-1 flex basis-1/2 items-center bg-white px-5 py-8 dark:bg-neutral-900 md:order-2 lg:px-24 relative z-10">
                  <RegistrationForm />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
