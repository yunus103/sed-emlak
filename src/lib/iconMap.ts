import {
  RiHomeHeartLine,
  RiKey2Line,
  RiBarChartBoxLine,
  RiBuilding4Line,
  RiScales3Line,
  RiShieldStarLine,
  RiBriefcase4Line,
  RiNewspaperLine,
  RiLightbulbLine,
  RiMapPinLine,
  RiMapLine,
  RiHammerLine,
  RiFileList3Line,
  RiHandHeartLine,
  RiCommunityLine,
  RiMoneyDollarCircleLine,
  RiSearchLine,
  RiStarLine,
  RiStore3Line,
  RiRulerLine,
} from "react-icons/ri";
import type { IconType } from "react-icons";

export const iconMap: Record<string, IconType> = {
  RiHomeHeartLine,
  RiKey2Line,
  RiBarChartBoxLine,
  RiBuilding4Line,
  RiScales3Line,
  RiShieldStarLine,
  RiBriefcase4Line,
  RiNewspaperLine,
  RiLightbulbLine,
  RiMapPinLine,
  RiMapLine,
  RiHammerLine,
  RiFileList3Line,
  RiHandHeartLine,
  RiCommunityLine,
  RiMoneyDollarCircleLine,
  RiSearchLine,
  RiStarLine,
  RiStore3Line,
  RiRulerLine,
};

export const defaultIcon = RiBuilding4Line;

/**
 * Sanity'den gelen icon string'ini React ikon bileşenine çevirir.
 * Eşleşme bulunamazsa default ikon döner.
 */
export function getIcon(iconName?: string | null): IconType {
  if (!iconName) return defaultIcon;
  return iconMap[iconName] || defaultIcon;
}
