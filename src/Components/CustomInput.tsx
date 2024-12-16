import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useTheme } from "@mui/material/styles"; // Import useTheme to access the theme
import SearchIcon from "@mui/icons-material/Search";

interface InputFieldProps {
  control?: any;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: any;
  onEndAdornmentClick?: any;
  showAdornment?: boolean;
  placeholder?: string;
  type?: string;
  title?: any;
  multiline?: boolean;
  options?: { label: string; value: string | number }[]; // Added options for dropdown
}

const textFieldDesign = (theme: any) => ({
  "& label": {
    color: theme.palette.text.secondary, // Label color will depend on theme
  },
  "& label.Mui-focused": {
    color: theme.palette.text.primary, // Change the label color when focused
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main, // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main, // Border color when focused
    },
    "& fieldset": {
      borderColor: theme.palette.primary.main, // Default border color
    },
    "& input": {
      color: theme.palette.mode === "dark" ? "white" : "black", // Text color changes depending on the mode
      backgroundColor: theme.palette.mode === "dark" ? "black" : "transparent", // Background color changes based on mode
    },
  },
  "& .MuiSelect-root": {
    color: theme.palette.mode === "dark" ? "white" : "black", // Text color inside Select based on mode
    backgroundColor: theme.palette.mode === "dark" ? "black" : "transparent", // Background color inside Select based on mode
  },
  "& .MuiInputBase-root": {
    color: theme.palette.mode === "dark" ? "white" : "black", // Text color inside InputBase based on mode
    backgroundColor: theme.palette.mode === "dark" ? "black" : "transparent", // Background color inside InputBase based on mode
  },
});

const CustomInput = ({
  control,
  name = "",
  label = "",
  title,
  placeholder,
  onEndAdornmentClick,
  showAdornment,
  required,
  disabled,
  errors = {},
  multiline,
  type,
  options = [], // Accept options for dropdown
}: InputFieldProps) => {
  const theme = useTheme(); // Access the current theme

  return (
    <>
      {control ? (
        <FormControl style={{ width: "100%", color: "white" }}>
          <Controller
            name={name}
            control={control}
            rules={{ required }}
            render={({ field: { value, onChange, onBlur } }) =>
              // Check if options exist to render a Select dropdown
              options.length > 0 ? (
                <>
                  <InputLabel>{label || title}</InputLabel>
                  <Select
                    size="small"
                    sx={() => textFieldDesign(theme)} // Pass the theme to style the Select component
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    label={label || title}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              ) : (
                <TextField
                  autoComplete="off"
                  size="small"
                  sx={() => textFieldDesign(theme)} // Pass the theme to style the TextField component
                  disabled={disabled}
                  label={label || title}
                  multiline={multiline}
                  rows={multiline ? 4 : 1} // If multiline is true, set rows to 4, otherwise 1
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type={type}
                  placeholder={placeholder}
                  InputProps={{
                    readOnly: disabled ? disabled : false,
                    endAdornment: showAdornment ? (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="click end adornment button"
                          onClick={onEndAdornmentClick}
                          sx={{ color: "#4e4e54" }}
                          edge="end"
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ) : null,
                  }}
                />
              )
            }
          />
          {errors?.[name] && (
            <FormHelperText sx={{ color: "error.main" }}>
              {errors?.[name].message}
            </FormHelperText>
          )}
        </FormControl>
      ) : (
        <></>
      )}
    </>
  );
};

export default CustomInput;
