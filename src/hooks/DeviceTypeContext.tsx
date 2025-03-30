import { createContext } from "react";

type DeviceType = "desktop" | "mobile";

/**
 * デバイスタイプのコンテキスト
 * 画面幅によってデバイスの種類を判定する
 */
const DeviceTypeContext = createContext<DeviceType>("desktop");

export default DeviceTypeContext;
