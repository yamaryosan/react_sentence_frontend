import { useState, useEffect } from 'react';
import DeviceTypeContext from '@/hooks/DeviceTypeContext';

type DeviceType = 'desktop' | 'mobile';

/**
 * デバイスタイプのプロバイダ
 * 画面幅によってデバイスの種類を判定
 */
export default function DeviceTypeProvider({ children }: { children: React.ReactNode }) {
    const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        const handleResize = () => {
            setDeviceType(window.innerWidth < 768 ? 'mobile' : 'desktop');
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
        <DeviceTypeContext.Provider value={deviceType}>
            {children}
        </DeviceTypeContext.Provider>
    );
}
