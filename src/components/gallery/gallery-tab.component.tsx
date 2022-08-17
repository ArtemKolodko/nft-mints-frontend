import "./gallery-tab.styles.scss";
import gridImg from "../../assets/imgs/grid.svg";
import basketImg from "../../assets/imgs/basket.svg";
import { Tab, Tabs } from "@mui/material";

export type GalleryTabProps = {
  activeTabIndex: number;
  handleChangeTab: (e: React.SyntheticEvent, value: number) => void
};

const GridIcon = () => <img src={gridImg} alt="Grid" />
const BasketIcon = () => <img src={basketImg} height={"64px"} alt="Basket" />

const GalleryTab = ({ activeTabIndex, handleChangeTab }: GalleryTabProps) => {
  return (
    <Tabs value={activeTabIndex} onChange={handleChangeTab} aria-label="icon tabs example" variant="fullWidth">
      <Tab icon={<GridIcon />} aria-label="phone" />
      <Tab icon={<BasketIcon />} aria-label="favorite" />
    </Tabs>);
};

export default GalleryTab;
