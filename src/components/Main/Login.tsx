import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import service from '../../service';
import { loginUser } from '../../modules/user';

interface IProps {
  // eslint-disable-next-line react/no-unused-prop-types
  color: string;
  // eslint-disable-next-line react/no-unused-prop-types
  large: boolean;
}

const useStyles = makeStyles((theme) => ({
  button: (props: IProps) => ({
    backgroundColor: props.color === 'white' ? '#eeeeee' : 'transparent',
    textTransform: 'none',
    fontSize: props.large ? '25px' : '16px',
    color: props.color === 'white' ? 'black' : '#eeeeee',
    borderColor: '#eee',
    width: '100%',
    fontWeight: props.large ? 600 : 500,
    borderWidth: '2px',
    '&:hover': {
      backgroundColor: '#000000',
      borderColor: '#000000',
      color: 'white',
    },
  }),
  icon: {
    marginRight: '10px',
  },
}));

type IWindowProps = {
  url: string;
  title: string;
  width: number;
  height: number;
};

const Login = (props: IProps): React.ReactElement => {
  const dispatch = useDispatch();

  const OAUTH_URL = `https://github.com/login/oauth/authorize?client_id=${
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_GITHUB_OAUTH_DEV_CLIENT_ID
      : process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID
  }&scope=user:email`;

  const [externalWindow, setExternalWindow] = useState<Window | null>();
  const intervalRef = useRef<number>();
  const history = useHistory();
  const { location } = history;
  const clearTimer = () => {
    window.clearInterval(intervalRef.current);
  };

  const createPopup = ({ url, title, height, width }: IWindowProps) => {
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const externalPopup = window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top}`,
    );
    return externalPopup;
  };

  const handleClick = () => {
    setExternalWindow(
      createPopup({
        url: OAUTH_URL,
        title: '',
        width: 500,
        height: 600,
      }),
    );
  };

  useEffect(() => {
    if (externalWindow) {
      intervalRef.current = window.setInterval(async () => {
        try {
          const currentUrl = externalWindow.location.search;
          const { code, error } = qs.parse(currentUrl, { ignoreQueryPrefix: true });
          if (error) {
            externalWindow.close();
            clearTimer();
          }
          if (!code) return;
          clearTimer();
          const { data } = await service.login(code as string);
          if (!data.token) {
            history.replace('/');
          } else {
            externalWindow.close();
            const { token, email, nickname } = data;
            localStorage.setItem('token', token);
            if (location.state) {
              history.go(-1);
            } else {
              if (loginUser) {
                dispatch(loginUser(token, email, nickname));
              }
              history.replace('/projects');
            }
          }
          // eslint-disable-next-line no-empty
        } catch (e) {
        } finally {
          if (!externalWindow || externalWindow.closed) {
            externalWindow.close();
            clearTimer();
          }
        }
      }, 1000);
    }
  });

  const classes = useStyles(props);
  return (
    <Button onClick={handleClick} variant="outlined" className={classes.button}>
      <GitHubIcon fontSize="inherit" className={classes.icon} />
      Sign in With GitHub
    </Button>
  );
};
export default Login;
