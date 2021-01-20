import React, { useEffect, useState } from "react";
import axios from "axios";
function Subscribe(props) {
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = () => {
    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    if (subscribed) {
      axios
        .post("/api/subscribe/unSubscribe", subscribedVariable)
        .then((res) => {
          if (res.data.success) {
            setSubscribeNumber(subscribeNumber - 1);
            setSubscribed(!subscribed);
          } else {
            alert("Failed to unSubscribe.");
          }
        });
    } else {
      axios.post("/api/subscribe/subscribe", subscribedVariable).then((res) => {
        if (res.data.success) {
          setSubscribeNumber(subscribeNumber + 1);
          setSubscribed(!subscribed);
        } else {
          alert("Failed to subscribe.");
        }
      });
    }
  };

  useEffect(() => {
    let subVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    axios.post("/api/subscribe/subscribeNumber", subVariable).then((res) => {
      if (res.data.success) {
        setSubscribeNumber(res.data.subscribeNumber);
      } else {
        alert("Failed to load Subscriber Number.");
      }
    });
    axios.post("/api/subscribe/subscribed", subVariable).then((res) => {
      if (res.data.success) {
        setSubscribed(res.data.subscribed);
      } else {
        alert("Failed to load Subscribe information.");
      }
    });
  }, []);

  return (
    <div>
      <button
        style={{
          background: `${subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick={onSubscribe}
      >
        {subscribeNumber}
        {subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
