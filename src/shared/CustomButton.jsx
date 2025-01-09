import { Button } from "antd";

const CustomButton = ({ content, handleClick }) => {
  return (
    <div>
      <Button
        className="text-[16px] px-9 py-5 bg-gradient-to-t from-[#468ddf] to-[#1969c3] text-white font-medium 
          hover:bg-gradient-to-t hover:from-blue-600 hover:to-blue-700
           hover:shadow "
        onClick={handleClick}
      >
        {content}
      </Button>
    </div>
  );
};

export default CustomButton;
