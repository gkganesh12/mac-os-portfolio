'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Wifi,
  BatteryCharging,
  BatteryFull,
  BatteryMedium,
  BatteryLow,
} from 'lucide-react';
import { format } from 'date-fns';
import { SYSTEM_CONFIG } from '@/config/system.config';

// Defensive interface for navigator.getBattery()
interface BatteryManager {
  level: number;
  charging: boolean;
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}

import { useSpotlightStore } from '@/store/spotlightStore';

export const SystemTray: React.FC = () => {
  const { openSpotlight } = useSpotlightStore();
  const [time, setTime] = useState(new Date());

  const [battery, setBattery] = useState({
    level: SYSTEM_CONFIG.battery.percentage,
    charging: SYSTEM_CONFIG.battery.isCharging,
    isSupported: false,
  });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Battery API Logic with fallback
  useEffect(() => {
    let batteryManager: BatteryManager | null = null;

    const updateBatteryInfo = (m: BatteryManager) => {
      setBattery({
        level: Math.round(m.level * 100),
        charging: m.charging,
        isSupported: true,
      });
    };

    const handleBatteryChange = (e: Event) => {
      if (e.target) updateBatteryInfo(e.target as unknown as BatteryManager);
    };

    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      (navigator as unknown as { getBattery: () => Promise<BatteryManager> })
        .getBattery()
        .then((m: BatteryManager) => {
          batteryManager = m;
          updateBatteryInfo(m);
          m.addEventListener('levelchange', handleBatteryChange);
          m.addEventListener('chargingchange', handleBatteryChange);
        })
        .catch((err: unknown) => {
          console.warn('Battery API failed, using fallback:', err);
        });
    }

    return () => {
      if (batteryManager) {
        batteryManager.removeEventListener('levelchange', handleBatteryChange);
        batteryManager.removeEventListener('chargingchange', handleBatteryChange);
      }
    };
  }, []);

  const getBatteryIcon = () => {
    if (battery.charging)
      return <BatteryCharging size={18} strokeWidth={2} className="text-white" />;
    if (battery.level > 80) return <BatteryFull size={18} strokeWidth={2} className="text-white" />;
    if (battery.level > 20)
      return <BatteryMedium size={18} strokeWidth={2} className="text-white" />;
    return <BatteryLow size={18} strokeWidth={2} className="text-[#ff453a]" />;
  };

  return (
    <div className="flex h-full items-center space-x-1.5 px-1">
      {/* Battery */}
      <div className="flex cursor-default items-center space-x-1.5 rounded-[4px] px-2 py-1 transition-colors hover:bg-white/10">
        <span className="text-[12px] font-medium text-[#f3f4f6]">{battery.level}%</span>
        {getBatteryIcon()}
      </div>

      {/* Wifi */}
      <div className="flex h-full cursor-default items-center justify-center rounded-[4px] px-2 transition-colors hover:bg-white/10">
        <Wifi size={17} strokeWidth={2} className="text-white" />
      </div>

      {/* Search */}
      <div
        className="flex h-full cursor-default items-center justify-center rounded-[4px] px-2 transition-colors hover:bg-white/10"
        onClick={openSpotlight}
      >
        <Search size={17} strokeWidth={2} className="text-white" />
      </div>

      {/* Date & Time */}
      <div className="cursor-default rounded-[4px] px-2 py-1 text-[13px] font-medium whitespace-nowrap text-[#f3f4f6] transition-colors hover:bg-white/10">
        {format(time, 'EEE d MMM h:mm a')}
      </div>
    </div>
  );
};
