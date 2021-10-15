import { useEffect, useState } from 'react'

import { calcTimeLeft } from '../../util/functions'

interface Iprops {
  startDate: Date;
  endDate: number,
  setMintButton: Function;
  setTimeUp: Function
}
interface ItimeLeft {
  day: number;
  hours: number;
  mins: number;
}

function Timer({ startDate, endDate, setMintButton, setTimeUp }: Iprops) {
  const calculateTimeLeft = () => {
    let timeLeft: any = {};
    // start date greater than current date => yet to start
    if (+new Date(startDate) > +new Date() ) {
      timeLeft = calcTimeLeft(startDate);
      timeLeft['label'] = 'TIME LAUNCH';
    };
    // start date less than to current date => Count down start
    if (+new Date(startDate) <= +new Date() && +new Date(endDate) > +new Date()) {
      timeLeft = calcTimeLeft(endDate);
      timeLeft['label'] = 'TIME LEFT';
    };

    // end date less than current date => Time up
    if (+new Date(endDate) < +new Date() ) {
      timeLeft = {};
    };
    return timeLeft
  };

  const calculateAngle = () => {
    if (+new Date(startDate) <= +new Date()) {
      const difference = +new Date(endDate) - +new Date();
      const totalSecond = +new Date(endDate) - +new Date(startDate);
      const progress: number = +(100 - (difference / totalSecond) * 100).toFixed(0);
      if(progress >=0) {
        return ((progress > 100 ? 100 : progress) / 100) * 180;
      }
    } else {
      return 0
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [angle, setAngle] = useState(calculateAngle());
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      setAngle(calculateAngle());
    }, 1000);
    if(timeLeft.label === 'TIME LAUNCH') {
      setMintButton(false);
      setTimeUp(false)
    };
    if(timeLeft.label === 'TIME LEFT') {
      setMintButton(true)
      setTimeUp(false)

    };
    !timeLeft.label && setTimeUp(true);
  });

  const timerComponents: any = []
  Object.keys(timeLeft).slice(0, 3).forEach((interval, i, arr) => {
    timerComponents.push(
      <div className="count-items" key={i}>
        {
          i === arr.length - 1 ?
            <span>
              {interval !== 'days' && timeLeft[interval] < 10 ? `0${timeLeft[interval]}` : `${timeLeft[interval]}`}
            </span> :
            <span>
              {interval !== 'days' && (timeLeft[interval] < 10) ? `0${timeLeft[interval]}:` : `${timeLeft[interval]}:`}
            </span>
        }

        <span>{interval}{" "}</span>
      </div>
    );
  });
  return (
    <div className="timer-wrap" style={{ ['--angle' as string]: angle + 'deg' }}>
      <div className="mask full">
        <div className="fill"></div>
      </div>
      <div className="mask half">
        <div className="fill"></div>
      </div>
      <div className="circle-inner">
        <div>
          <h2 className={`${!timeLeft['label'] ? 'mb-0' : ''}`}>{timeLeft['label'] || "TIME'S UP"}</h2>
          <div className="timer-box">
            {timerComponents.length ? timerComponents : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer
