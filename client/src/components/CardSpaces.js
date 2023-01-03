import { Button, Card } from "@mui/material";
import React from "react";
import "./cardSpaces.css";
function CardSpaces() {
  return (
    <div className="space">
      <Card className="card-space-header">
        <div className="card-header">
          <img
            className="card-image"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
            alt="random"
          />
          <h3>Math in AI</h3>
        </div>
        <div className="card-content">
          <p>
            Linear Algebra is the primary mathematical computation tool in
            Artificial Intelligence and in many other areas of Science and
            Engineering.{" "}
          </p>
        </div>
        <Button style={{ color: "#00d5fa" }}> Learn More</Button>
      </Card>
      {/* //second card */}
      <Card className="card-space-header">
        <div className="card-header">
          <img
            className="card-image"
            src="https://www.deeplearnphysics.org/theme/images/simulation3d_label.png"
            alt="random"
          />
          <h3>Deep Physics </h3>
        </div>
        <div className="card-content">
          <p>
            AI that can predict the wave functions of molecules and materials
            with little computational effort will mean that we can study systems
            and problems that were previously inaccessible.{" "}
          </p>
        </div>
        <Button style={{ color: "#00d5fa" }}> Learn More</Button>
      </Card>

      {/* //third card */}
      <Card className="card-space-header">
        <div className="card-header">
          <img
            className="card-image"
            src="https://imageio.forbes.com/specials-images/imageserve/5f7376dc40469ab26495a8e5/Artificial-Intelligence-Brain/960x0.jpg?format=jpg&width=960"
            alt="random"
          />
          <h3>Beauty of ML</h3>
        </div>
        <div className="card-content">
          <p>
            In recent years, artificial intelligence has become more and more
            important in the development of artwork. In 2018, the first artwork
            "painted" by an AI program was sold at an auction for $432,500.{" "}
          </p>
        </div>
        <Button style={{ color: "#00d5fa" }}> Learn More</Button>
      </Card>
      {/* //fourth card */}
      <Card className="card-space-header">
        <div className="card-header">
          <img
            className="card-image"
            src="https://www.asme.org/getmedia/e238675a-177d-4549-9f71-ca34528c1ee4/071421_smartfactories_inset2.jpg?width=970&height=720&ext=.jpg"
            alt="random"
          />
          <h3>Smartest Tech</h3>
        </div>
        <div className="card-content">
          <p>
            Every year the World Economic Forum's Global Lighthouse Network
            honors companies that use Industry 4.0 and Internet of Things (IoT)
            technologies to make their operations more efficient,
            environment-friendly, and lower cost.{" "}
          </p>
        </div>
        <Button style={{ color: "#00d5fa" }}> Learn More</Button>
      </Card>
    </div>
  );
}

export default CardSpaces;
