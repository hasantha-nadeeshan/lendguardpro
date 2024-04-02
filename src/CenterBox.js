import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const CenterBox = (props) => {
  const wrapperStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100%',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cardStyles = {
    zIndex: 20,
    padding: '20px',
    backgroundColor: '#080C18',
  };

  const imageStatusStyles = {
    color: 'green',
  };

  const titleStyles = {
    color: 'rgb(224, 219, 219)',
  };

  const statusStyles = {
    fontSize: '24px',
    color: 'white',
    fontWeight: 'bold',
  };

  const alertSubStyles = {
    color: 'rgb(250, 243, 243)',
  };

  const alertAmountStyles = {
    color: 'rgb(250, 243, 243)',
    fontSize: '24px',
  };

  const alertProbStyles = {
    color: 'rgb(168, 167, 167)',
    fontSize: '14px',
  };

  const tickStyles = {
    color: 'rgb(12, 206, 12)',
    fontSize: '30px',
  };

  const crossStyles = {
    color: 'rgb(212, 29, 29)',
    fontSize: '30px',
  };

  return (
    <div style={wrapperStyles}>
      <div style={cardStyles} className="col-md-4 text-center justify-content-center card">
        <p style={titleStyles} className='alert-title'>Hi, {props.name} {props.name2}</p>
        <div className="status" style={statusStyles}>
          {props.status === 0 ? (<p className='status'>Your are Safe</p>) : (<p className='status'>You are in Unsafe</p>)}
        </div>
        <div className="image-status" style={imageStatusStyles}>
          {props.status === 0 ? (<CheckIcon style={tickStyles} />) : (<WarningAmberIcon sx={{ fontSize: 40 }} style={crossStyles} />)}
        </div>
        <div className="alert-sub" style={alertSubStyles}>System Can Propose you to Safe Finance Amount</div>
        <div className="alert-amount" style={alertAmountStyles}>{props.amount}LKR</div>
        <div className='alert-prob' style={alertProbStyles}>Probability : {props.factor}</div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary pt-2 pb-2 px-3" style={{ fontSize: '12px' }} onClick={props.onClose}>Save & Exit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterBox;
