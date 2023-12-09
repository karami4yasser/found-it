import Toast from "react-native-root-toast";
import { COLORS } from "../styles/theme";

const _messageQueue = [];
let _toast = null;

/**
 * Display multiple messages as a toast
 */
export default class Toaster {
  /**
   *
   * @example
   * Toaster.show('message'); // toast visible for Toast.durations.LONG by default
   * Toaster.show('message', 0); // won't hide automatically need to click on Toast
   * Toaster.show('message', 1500, true); // toast visible for given timestamp with animation
   *
   * @param {string} message - toast message
   * @param {number} duration - time duration
   * @param {boolean} animation - handle the animation
   * @param {string} backgroundColor -backGround Color
   */
  static show(
    message,
    duration = Toast.durations.LONG,
    animation = false,
    backgroundColor = COLORS.green
  ) {
    _messageQueue.push({ message, duration, animation, backgroundColor });
    if (_messageQueue.length === 1) {
      // eslint-disable-next-line no-use-before-define
      _showToaster();
    }
  }
}

function _processQueue() {
  _messageQueue.shift();
  if (_messageQueue.length) {
    // eslint-disable-next-line no-use-before-define
    _showToaster();
  }
}

function _hideToaster() {
  Toast.hide(_toast);
  _processQueue();
}

function _showToaster() {
  const { message, duration, animation, backgroundColor } = _messageQueue[0];
  const hideOnPress = duration === 0;
  _toast = Toast.show(message, {
    duration: 0,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation,
    hideOnPress,
    delay: 0,
    backgroundColor,
    textStyle: {
      color: "white",
    },
    onHide: () => {
      if (hideOnPress) {
        _processQueue();
      }
    },
  });

  if (!hideOnPress) {
    setTimeout(_hideToaster, duration);
  }
}
