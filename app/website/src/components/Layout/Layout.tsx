import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/outline";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import Cookies from "universal-cookie";
import { Fragment, useState } from "react";
import { Nagivation } from "../../types/Layout.types";
import Button from "../Buttons/Button";
import Footer from "../Footer";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Layout() {
  const navigate = useNavigate();
  const auth = new Cookies().get("TOKEN");

  const navigation: Nagivation[] = [
    { name: "Home", link: ROUTES.HOME, current: false, auth: false },
    { name: "About", link: ROUTES.ABOUT, current: false, auth: false },
    {
      name: "Register",
      link: ROUTES.REGISTER,
      current: false,
      auth: false,
      hideAfterAuth: true,
    },
    {
      name: "Login",
      link: ROUTES.LOGIN,
      current: false,
      auth: false,
      hideAfterAuth: true,
    },
    {
      name: "Projects",
      link: ROUTES.LIST_PROJECTS,
      current: false,
      auth: true,
    },
  ];

  const navigationLogick = (item: Nagivation) => {
    if (item.auth && !auth) {
      return null;
    }
    if (item.hideAfterAuth && auth) {
      return null;
    }

    return (
      <Link
        key={item.name}
        to={item.link}
        className={
          "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        }
      >
        {item.name}
      </Link>
    );
  };

  const signOut = () => {
    new Cookies().remove("TOKEN");
    navigate(ROUTES.HOME);
  };

  const showProfile = () => {
    if (auth) {
      return (
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="flex rounded-full bg-gray-800 text-sm">
              <span className="sr-only">Open user menu</span>
              <UserCircleIcon className="h-8 w-8 rounded-full text-white" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                    onClick={() => {
                      navigate(ROUTES.PROFILE);
                    }}
                  >
                    Your Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                    onClick={() => {
                      navigate(ROUTES.SETTINGS);
                    }}
                  >
                    Settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                    onClick={signOut}
                  >
                    Sign out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      );
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div>
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to={ROUTES.HOME}>
                  <div className="flex-shrink-0 text-white p-2 border-2 border-white rounded">
                    OPEN DOC
                  </div>
                </Link>

                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => navigationLogick(item))}
                    {auth && (
                      <Button
                        text="Create Project"
                        theme="primary"
                        onClick={() => {
                          navigate(ROUTES.CREATE_PROJECT);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div>{showProfile()}</div>
            </div>
          </div>

          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div className="md:hidden" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <a
                    href="#"
                    className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Dashboard
                  </a>

                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Team
                  </a>

                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Projects
                  </a>

                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Calendar
                  </a>

                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Reports
                  </a>
                </div>
              </div>
            )}
          </Transition>
        </nav>

        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
