const NavBar = () => {
  return (
    <>
      <nav className="flex justify-between items-center bg-secondary p-4">
        <div className="text-neutral-100 text-lg font-semibold">
          VigIA Themis
        </div>
        <div className="flex gap-10 mr-10 text-neutral-100">
          <a href="#" className=" hover:font-bold">
            Home
          </a>
          <a href="#" className=" hover:font-bold">
            About
          </a>
          <a href="#" className=" hover:font-bold">
            Contact
          </a>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
