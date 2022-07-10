import {useEffect, useRef} from "react";

const GoogleButton = () => {
  const googleButton = useRef<HTMLDivElement | null>(null);

  // Load google button
  useEffect(() => {
    if (googleButton.current) {
      google.accounts.id.renderButton(
        googleButton.current,
        {theme: "outline", size: "large"}
      );
    }
  }, []);

  return (
    <div ref={googleButton} id="google-button"></div>
  );
};

export default GoogleButton;
