import './index.less';
import bg from '@/assets/images/hosting/bg.png';
import avatar from '@/assets/images/hosting/avatar.png';
import sj from '@/assets/images/hosting/sj.png';
import host from '@/assets/images/hosting/host.png';
import popup from '@/assets/images/hosting/popup.png';
import TitleText from '@/assets/images/hosting/title-text.png';
const Hosting = () => {
  return (
    <div className="hosting">
      <div className="hosting-bg">
        <img src={bg} />
      </div>
      <div className="hosting-content">
        <div className="hosting-content-info">
          <img className="hosting-content-info-left" src={avatar} />
          <div className="hosting-content-info-right">
            <div className="hosting-content-info-right-name">Daisy 9000</div>
            <div className="hosting-content-info-right-lv">
              <div className="hosting-content-info-right-lv-text GeologicaRegular">LV7</div>
              <div className="hosting-content-info-right-lv-step">
                <div className="hosting-content-info-right-lv-step-main" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hosting-content-host">
          <div className="hosting-content-host-text">Hi, I'm Daisy 9000. Click "X" to authorize and unlock the automatic tweeting!</div>
          <img className="hosting-content-host-text-sj" src={sj} />

          <img src={host} className="hosting-content-host-icon" />
        </div>
        <div className="hosting-content-popup">
          <div className="hosting-content-popup-line"></div>
          <img src={popup} className="hosting-content-popup-icon" />
          <div className="hosting-content-popup-main">
            <div className="hosting-content-popup-main-title">
              <div className="hosting-content-popup-main-title-icon"></div>
              <img className="hosting-content-popup-main-title-text" src={TitleText} />
              <div className="hosting-content-popup-main-title-switch"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hosting;
