export type QuickSettingPositionType = 'home' | 'bubble';

export interface SettingsType {
  glassmorphismDesign: boolean;
  maxRecentScoreNum: number;
  numberFormat: number;

  showQuickSetting: boolean;
  showStartUpLogo: boolean;

  quickSetting: { position: QuickSettingPositionType; minimizeUI: boolean };
}
