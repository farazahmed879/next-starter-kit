import { SvgIconProps } from "@mui/material";
import * as MuiIcons from "@mui/icons-material";

interface IconProps extends SvgIconProps {
  name: keyof typeof MuiIcons;
  hover?: boolean;
}

export default function CustomIcon({
  name,
  
  hover = false,
  ...props
}: IconProps) {
  const IconComponent = MuiIcons[name];

  const handleMouseEnter = (e: React.MouseEvent<SVGSVGElement>) => {
    if (hover) {
      (e.target as SVGSVGElement).style.transform = "translateY(-3px)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<SVGSVGElement>) => {
    if (hover) {
      (e.target as SVGSVGElement).style.transform = "translateY(0)";
    }
  };

  return IconComponent ? (
    <IconComponent
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.3s ease",
        cursor: "pointer" 
      }}
    />
  ) : null;
}
