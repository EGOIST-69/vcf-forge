import { FaFacebook, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="text-center space-y-3 py-5 bg-red-500">
      <h2 className="text-lg ">Devloped By Hamid Shahriar</h2>
      <div className="flex justify-center gap-10 ">
        <a className="" href="https://www.facebook.com/hamid.shahriar.37">
          <FaFacebook />
        </a>
        <a
          className=""
          href="https://www.linkedin.com/in/hamid-shahriar-149ba91b1"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
};

export default Footer;
