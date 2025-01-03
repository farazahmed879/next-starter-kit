import InputEmojiWithRef from "react-input-emoji";
import CustomButton from "./CustomButton";

const CustomEmojiInput = ({
  chatInput,
  setChatInput,
  handleSendButton,
  sendbuttonText = "Send"
}: {
  chatInput: string;
  setChatInput: any;
  handleSendButton: any;
  sendbuttonText?: string
}) => {
  return (
    <div style={{ display: "flex" }}>
      <InputEmojiWithRef
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
