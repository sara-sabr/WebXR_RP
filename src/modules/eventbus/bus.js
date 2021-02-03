/**
 * Event bus that is synchronous.
 *
 * Adapted from https://css-tricks.com/lets-create-a-lightweight-native-event-bus-in-javascript/
 *
 * The event bus leverages the DOM event processing to pass events across various modules.
 * A priority queue is leveraged by using event bubbling.
 *
 * Unfortunately, ES6 classes does not have private methods, so going function route for now.
 *
 * @param {integer} prioritySize the number of priorities to support.
 */
function EventBus(prioritySize) {
  /**
   * The DOM object used for event processing.
   */
  let eventTarget;

  /**
   * Initialize the event bus with priority queue.
   *
   * @param {integer} prioritySize the number of priorities to support.
   */
  const initializeQueue = function (prioritySize) {
    // Create a new nested div fields which will be used as our event trap.
    let parentNode;
    for (let idx = 0; idx < prioritySize; idx++) {
      if (eventTarget) {
        parentNode = eventTarget;
      } else {
        parentNode = document.body;
      }

      eventTarget = document.createElement('div');
      parentNode.appendChild(eventTarget);
    }
  };

  /**
   * Get the target queue by the priority.
   *
   * @param {number} priority the priority queue to return.
   * @return {HTMLElement} the DOM object associated to the given priority.
   */
  const getTargetQueue = function (priority) {
    let targetNode = eventTarget;

    while (priority > 1) {
      priority--;
      targetNode = targetNode.parentNode;
    }

    return targetNode;
  };

  /**
   * Subscribe to a given event. Order of when a subscriber will execute is indeterministic.
   *
   * @param {string} type The event name to fire.
   * @param {number} priority The priority of the subscription (Indexed 1) where
   *                           highest priorty is 1 and then descending.
   * @param {function} callback the function to call.
   */
  this.subscribe = function (type, priority, callback) {
    getTargetQueue(priority).addEventListener(type, callback);
  };

  /**
   * Unsubscribe to an event.
   *
   * @param {string} type The event name to fire.
   * @param {number} priority The priority of the subscription (Indexed 1) where
   *                           highest priorty is 1 and then descending.
   * @param {function} callback the function to call.
   */
  this.unsubscribe = function (type, priority, callback) {
    getTargetQueue(priority).remove.off(type, listener);
  };

  /**
   * Send an event.
   *
   * @param {string} type The event name to fire.
   * @param {object} detail the data to send to the event bus.
   */
  this.emit = function (type, detail) {
    eventTarget.dispatchEvent(
      new CustomEvent(type, {
        bubbles: true,
        details: detail,
      })
    );
  };

  initializeQueue(prioritySize);
}

export { EventBus };
