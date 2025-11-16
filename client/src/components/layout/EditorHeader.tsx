import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { IoMdEye } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { MdOutlinePublish } from "react-icons/md";
import Button from "../common/Button";

const EditorHeader = () => {
  return (
    <div className="bg-light-parchment flex items-center justify-between px-4 py-2">
      <Link to={"/"}>
        <img src={logo} alt="logo" className="h-12 w-12" />
      </Link>
      <div className="flex items-center gap-6">
        <Button className="flex items-center gap-2 bg-green-500">
          <IoMdEye />
          <span>Preview</span>
        </Button>
        <Button className="bg-saffron flex items-center gap-2">
          <FaSave />
          <span>Save Draft</span>
        </Button>
        <Button className="bg-maroon flex items-center gap-2">
          <MdOutlinePublish />
          <span>Publish</span>
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
