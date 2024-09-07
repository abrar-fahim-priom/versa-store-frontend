import LoginForm from "../Components/Account/LoginForm.jsx";
import NavBar from "../Components/Header/NavBar.jsx";
import loginImage from "../images/login-image.jpg";

export default function Login() {
  return (
    <>
      <div className="bg-neutral-100 z-50 dark:bg-gray">
        <NavBar />

        <main>
          <div data-nc-id="PageLogin" className="container">
            <div className="pb-24 pt-2">
              <div className="flex flex-col md:flex-row">
                <div className="order-2 basis-1/2 md:order-1">
                  <div className="relative aspect-video h-full bg-neutral-300 md:aspect-auto  lg:aspect-[8/7]">
                    <img
                      src={loginImage}
                      alt="about us"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="order-1 flex basis-1/2 items-center bg-white px-5 py-8 dark:bg-neutral-900 md:order-2 lg:px-24">
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
