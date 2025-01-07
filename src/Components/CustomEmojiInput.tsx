import InputEmojiWithRef from "react-input-emoji";
import CustomButton from "./CustomButton";
import { useEffect, useRef } from "react";

const CustomEmojiInput = ({
  chatInput,
  setChatInput,
  handleSendButton,
  sendbuttonText = "Send",
  disabled = false,
}: {
  chatInput: string;
  setChatInput: any;
  handleSendButton: any;
  sendbuttonText?: string;
  disabled?: boolean;
}) => {
  const emojiInputRef = useRef<any>(null);

  const disableInput = () => {
    if (emojiInputRef.current) {
      emojiInputRef.current.querySelector("input").disabled = true; // Disable input element directly
    }
  };

  useEffect(() => {

  },[]);

  return (
    <div style={{ display: "flex" }}>
      <InputEmojiWithRef
        ref={emojiInputRef}
        placeholderColor="Enter Message here"
        value={chatInput}
        onChange={setChatInput}
        cleanOnEnter
        onEnter={handleSendButton}
        placeholder="Type a message"
        shouldReturn={true}
        shouldConvertEmojiToImage={false}
      />
      <div style={{ margin: 10 }}>
        <CustomButton
          disabled={disabled}
          text={sendbuttonText}
          handleClick={handleSendButton}
          size={"small"}
          variant={"contained"}
        />
      </div>
    </div>
  );
};
export default CustomEmojiInput;
