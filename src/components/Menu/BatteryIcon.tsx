import Battery20Icon from '@mui/icons-material/Battery20';
import Battery30Icon from '@mui/icons-material/Battery30';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery60Icon from '@mui/icons-material/Battery60';
import Battery80Icon from '@mui/icons-material/Battery80';
import Battery90Icon from '@mui/icons-material/Battery90';
import BatteryFullIcon from '@mui/icons-material/BatteryFull'

import BatteryCharging20 from '@mui/icons-material/BatteryCharging20';
import BatteryCharging30 from '@mui/icons-material/BatteryCharging30';
import BatteryCharging50 from '@mui/icons-material/BatteryCharging50';
import BatteryCharging60 from '@mui/icons-material/BatteryCharging60';
import BatteryCharging80 from '@mui/icons-material/BatteryCharging80';
import BatteryCharging90 from '@mui/icons-material/BatteryCharging90';
import BatteryChargingFull from '@mui/icons-material/BatteryChargingFull'

import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';

interface BatteryIconProps {
  batteryLevel: number,
  isCharging: boolean
}
export default function BatteryIcon(BatteryIconProps : BatteryIconProps) {
  const batteryIsCharging = BatteryIconProps.isCharging;
  const batteryLevelRounded = 10 * Math.round(BatteryIconProps.batteryLevel / 10);
    if (batteryIsCharging) {
      switch (batteryLevelRounded) {
        case 0:
          return <BatteryCharging20 sx={{transform: 'rotate(90deg)'}}/>
        case 10:
          return <BatteryCharging20 sx={{transform: 'rotate(90deg)'}}/>
        case 20:
          return <BatteryCharging20 sx={{transform: 'rotate(90deg)'}}/>
        case 30:
          return <BatteryCharging30 sx={{transform: 'rotate(90deg)'}}/>
        case 40:
          return <BatteryCharging30 sx={{transform: 'rotate(90deg)'}}/>
        case 50:
          return <BatteryCharging50 sx={{transform: 'rotate(90deg)'}}/>
        case 60:
          return <BatteryCharging60 sx={{transform: 'rotate(90deg)'}}/>
        case 70:
          return <BatteryCharging60 sx={{transform: 'rotate(90deg)'}}/>
        case 80:
          return <BatteryCharging80 sx={{transform: 'rotate(90deg)'}}/>
        case 90:
          return <BatteryCharging90 sx={{transform: 'rotate(90deg)'}}/>
        case 100:
          return <BatteryChargingFull sx={{transform: 'rotate(90deg)'}}/>
        
      }
    } else {
      switch (batteryLevelRounded) {
        case 0:
          return <Battery20Icon sx={{transform: 'rotate(90deg)'}}/>
        case 10:
          return <Battery20Icon sx={{transform: 'rotate(90deg)'}}/>
        case 20:
          return <Battery20Icon sx={{transform: 'rotate(90deg)'}}/>
        case 30: 
          return <Battery30Icon sx={{transform: 'rotate(90deg)'}}/>
        case 40:
          return <Battery30Icon sx={{transform: 'rotate(90deg)'}}/>
        case 50:
          return <Battery50Icon sx={{transform: 'rotate(90deg)'}}/>
        case 60:
          return <Battery60Icon sx={{transform: 'rotate(90deg)'}}/>
        case 70:
          return <Battery60Icon sx={{transform: 'rotate(90deg)'}}/>
        case 80:
          return <Battery80Icon sx={{transform: 'rotate(90deg)'}}/>
        case 90:
          return <Battery90Icon sx={{transform: 'rotate(90deg)'}}/>
        case 100:
          return <BatteryFullIcon sx={{transform: 'rotate(90deg)'}}/>
      }
    }
}

    
