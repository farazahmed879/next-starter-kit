import { Button, ButtonPropsColorOverrides } from "@mui/material";
import { MouseEventHandler } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

const CustomButton = ({
  handleClick,
  buttonType = "button",
  variant = "contained",
  size = "",
  text = "Click here",
  color = "Primary",
  widthProp = false,
  isLoadingButton = false,
  isLoading = false,
  disabled = false,
}: {
  handleClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  buttonType?: any;
  variant?: any;
  size?: any;
  text?: string;
  color?: any;
  widthProp?: boolean;
  isLoadingButton?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}) => {
  return (
    <>
      {isLoadingButton ? (
        <LoadingButton
          disabled={disabled}
          loading={isLoading}
          loadingPosition="start"
          // startIcon={<SaveIcon />}
          variant={variant}
          size={size}
          onClick={handleClick}
          fullWidth={widthProp}
          type={buttonType}
        >
          {text}
        </LoadingButton>
      ) : (
        <Button
          disabled={disabled}
          type={buttonType}
          variant={variant}
          onClick={handleClick}
          size={size}
          color={color}
          fullWidth={widthProp}
        >
          {text}
        </Button>
      )}
    </>
  );
};
export default CustomButton;
