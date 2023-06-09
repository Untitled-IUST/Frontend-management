import style from "./App.module.css";
import AddModal from "./AddModal";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import "./ImageSlider.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";

const styleB = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  backgroundColor: "#edc7b7",
  p: 4,
  position: "absolute",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const styleC = {
  top: "50%",
  left: "50%",
  width: 400,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  backgroundColor: "#edc7b7",
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const stylepmr = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#edc7b7",
  boxShadow: 24,
  p: 4,
  fontFamily: "Roboto, ",
};

function InputModal({ label, value, onChange,maxlength }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        sx={{ color: "#BAB2B5", fontFamily: "Roboto, " }}
        onClick={handleOpen}
      >
        {label}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={stylepmr}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {label}
          </Typography>
          <input type="text" value={value} onChange={onChange} maxlength={maxlength}/>
          <Button  className="bty" onClick={handleClose} sx={{color:"#ac3b61"}}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}

function ImageModal({ label, onChange }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} sx={{ color: "#AC3B61", marginLeft: "2%" }}>
        {label}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={stylepmr}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {label}
          </Typography>
          <input type="file" accept="image/jpeg" onChange={onChange} />
          <Button onClick={handleClose} sx={{ color: "#ac3b61" }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
function ImageSlider() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [categoryName, setCategoryName] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  //  isFirstPostSuccessful = false;
  const [isFirstPostSuccessful, setISfirstpostSuccessFull] = useState(false);
  // let isFirstPostSuccessful = false;
  // let resourceId;
  const [resourceId, setResourseid] = useState(0);
  // console.log("gf",resourceId)
  // useEffect(() => {

  //       const response = await axios.get(
  //         'https://amirmohammadkomijani.pythonanywhere.com/barber/description/',
  //         {
  //           headers: {
  //             'Authorization': `JWT ${access_token}`,
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );
  //       setTitle(response.data.results[0].title);
  //       setDescription(response.data.results[0].description);
  //       setImage(response.data.results[0].img);
  //     } catch (error) {
  //       console.error(error);
  //     }

  // }, []);

  useEffect(() => {
    // console.log(access_token)
    axios
      .get(
        "https://amirmohammadkomijani.pythonanywhere.com/barber/description/",
        {
          headers: {
            Authorization: `JWT ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // console.log("isFirstPostSuccessful")
        // console.log(isFirstPostSuccessful)

        const arr = response.data.results;
        if (!(arr.length === 0)) {
          // console.log(arr.length);
          // console.log(response.data.results);
          setISfirstpostSuccessFull(true);
          setResourseid(response.data.results[0].id);
          setDescription(response.data.results[0].description);
          setTitle(response.data.results[0].title);
          setImage(response.data.results[0].img);
          setImagePreviewUrl(response.data.results[0].img);
        } else {
          setISfirstpostSuccessFull(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  async function handleSubmit(event) {
    event.preventDefault();
    // Create a FormData object to hold the data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("img", image);
    // console.log('imgnew',image)

    try {
      let response;
      // console.log(isFirstPostSuccessful)
      // console.log("88")
      if (isFirstPostSuccessful) {
        // console.log(isFirstPostSuccessful)
        // Send PUT request
        // console.log("gfh",resourceId)
        const putUrl = `https://amirmohammadkomijani.pythonanywhere.com/barber/description/${resourceId}/`;
        response = await axios.put(putUrl, formData, {
          headers: {
            Authorization: `JWT ${access_token}`,
          },
        });
        alert(`You  Eddited Succsussfuly`);
        axios
          .get(
            "https://amirmohammadkomijani.pythonanywhere.com/barber/description/",
            {
              headers: {
                Authorization: `JWT ${access_token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            // console.log("isFirstPostSuccessful")
            // console.log(isFirstPostSuccessful)

            const arr = response.data.results;
            if (!(arr.length === 0)) {
              // console.log(arr.length);
              // console.log(response.data.results);
              setISfirstpostSuccessFull(true);
              setResourseid(response.data.results[0].id);
              setDescription(response.data.results[0].description);
              setTitle(response.data.results[0].title);
              setImage(response.data.results[0].img);
            } else {
              setISfirstpostSuccessFull(false);
            }
          })
          .catch((err) => console.log(err));
      } else {
        // Send POST request
        const postUrl =
          "https://amirmohammadkomijani.pythonanywhere.com/barber/description/";
        response = await axios.post(postUrl, formData, {
          headers: {
            Authorization: `JWT ${access_token}`,
          },
        });
        // setISfirstpostSuccessFull(true);
        setResourseid(response.data.id);

        alert(`You  Posted Succussfuly Time.`);

        console.log("respone after post", resourceId);
      }

      axios
        .get(
          "https://amirmohammadkomijani.pythonanywhere.com/barber/description/",
          {
            headers: {
              Authorization: `JWT ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // console.log("isFirstPostSuccessful")
          // console.log(isFirstPostSuccessful)

          const arr = response.data.results;
          if (!(arr.length === 0)) {
            // console.log(arr.length);
            // console.log(response.data.results);
            setISfirstpostSuccessFull(true);
            setResourseid(response.data.results[0].id);
            setDescription(response.data.results[0].description);
            setTitle(response.data.results[0].title);
            setImage(response.data.results[0].img);
          } else {
            setISfirstpostSuccessFull(false);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    }
  }

  const handleTabChange = (event, newIndex) => {
    setCurrentTabIndex(newIndex);
    setCategoryIndex(data[newIndex].id);

    localStorage.setItem("categoryId", data[newIndex].id);
  };

  const [ShowComponent, setShowComponent] = useState({
    add: false,
  });
  const btnhandler = (event) => {
    if (expireDays > 0) {
      setShowComponent({
        ...ShowComponent,
        [event.target.name]: !ShowComponent[event.target.name],
      });
    } else {
      handleOpen();
    }
  };

  const servicehandler = (id) => {
    axios({
      method: "delete",

      url:
        "https://amirmohammadkomijani.pythonanywhere.com/barber/categories/" +
        categoryIndex +
        "/service/" +
        id,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${access_token}`,
      },
    }).then((res) => {
      window.location.reload(false);
    });
  };

  function categorySubmit(event) {
    axios({
      method: "post",
      url: "https://amirmohammadkomijani.pythonanywhere.com/barber/categories/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${access_token}`,
      },
      data: {
        category: categoryName,
      },
    })
      .then((res) => {
        // console.log(res);
        window.location.reload(false);
      })
      .catch((error) => {
        console.warn(error);
      });
    event.preventDefault();
  }

  const [servicefront, setServicefront] = useState([]);
  const [data, setMydata] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [expireDays, setExpireDays] = useState(1);
  const [expireDate, setExpireDate] = useState();

  let access_token = localStorage.getItem("accessTokenBarber");

  useEffect(() => {
    axios({
      method: "get",
      url: "https://amirmohammadkomijani.pythonanywhere.com/barber/categories/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${access_token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setMydata(response.data.results);
        setServicefront(response.data.results);
      })
      .catch((error) => {
        console.warn(error);
      });

    axios
      .get("https://amirmohammadkomijani.pythonanywhere.com/barber/premium/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
      })
      .then((res) => {
        setExpireDays(res.data[0].days);
        // setExpireDays(0);
        setExpireDate(res.data[0].expire_date);
      })
      .catch((err) => {
        // console.log(err)
      });
  }, []);

  return (
    <div className="All_Slider">
      {expireDays == 0 && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Your premium subscription has expired —{" "}
            <a href="/PremiumPlans">
              <strong>you will need to renew your subscription!</strong>
            </a>
          </Alert>
        </Stack>
      )}
      <div className="wholebarber">
        <div>
          <div />
          <div className="hairdressers">
            <Tabs
              value={currentTabIndex}
              onChange={handleTabChange}
              centered
              textColor="primary"
            >
              {servicefront.map((item, index) => (
                <Tab
                  key={item.category}
                  label={item.category}
                  style={{ color: "#ac3b61", fontWeight: "bold" }}
                />
              ))}

              <IconButton onClick={() => handleOpen()}>
                <AddCircleOutlineIcon style={{ color: "#ac3b61" }} />
              </IconButton>
            </Tabs>
            <Modal
              open={open && expireDays > 0}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleB}>
                <p className="AddCategory_Modal">Add a New Category</p>
                <form onSubmit={categorySubmit}>
                  <input
                    class="inputbox"
                    onChange={(e) => setCategoryName(e.target.value)}
                    type="text"
                    placeholder="Category"
                    name="Category"
                  />
                  <br></br>
                  <br></br>
                  <Button
                    type="submit"
                    variant="outlined"
                    style={{ backgroundColor: "#ac3b61", color: "#eee2dc" }}
                  >
                    Add Category
                  </Button>
                </form>
              </Box>
            </Modal>

            <Modal
              open={open && expireDays == 0}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Stack sx={styleC} spacing={2}>
                <Alert severity="error">
                  <AlertTitle>We're sad to see you go</AlertTitle>
                  <p className="alert-expire">
                    Your premium plan has expired on the {expireDate}!<br></br>
                    When your subscription ends you can no longer add your
                    categories or services.
                    <br></br>
                    if you want to come back, Untitle Premium is just a click
                    away.
                    <br></br>
                    <br></br>
                  </p>

                  <Button
                    href="/PremiumPlans"
                    variant="outlined"
                    style={{ backgroundColor: "#ac3b61", color: "#eee2dc" }}
                  >
                    GET UNTITLED PREMIUM
                  </Button>
                </Alert>
              </Stack>
            </Modal>

            {servicefront.map((item, index) => (
              <div
                key={item.category}
                className={currentTabIndex === index ? "All_Services" : ""}
                style={{ display: currentTabIndex === index ? "flex" : "none" }}
              >
                {item.categoryServices.map((x) => (
                  <Grid item xs={12} sm={6} md={4} key={x.service}>
                    <Card
                      sx={{
                        // maxWidth: 250,
                        // minWidth: 150,
                        width: 180,
                        height: 300,
                        bgcolor: "#edc7b7",
                        fontFamily: "Roboto",
                        color: "#120c1e",
                        borderRadius: 2,
                        margin: 2,
                      }}
                    >
                      <CardMedia
                        sx={{ height: 140 }}
                        image={
                          x.servicePic
                            ? x.servicePic
                            : "https://s2.uupload.ir/files/a9d966e052bdeb38027ca58ac3217845_z5j6.jpg"
                        }
                        title="Hair style"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {x.service}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {x.price}$
                        </Typography>
                        <IconButton
                          aria-label="delete"
                          onClick={() => servicehandler(x.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    rowGap: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    name="add"
                    onClick={btnhandler}
                    style={{
                      backgroundColor: "#edc7b7",
                      color: "#261B39",
                      fontSize: "100px",
                      width: "180px",
                      height: "300px",
                      marginLeft: "20px",
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className={style.mainContainer}>
            <div className={style.btnComponentController}></div>
            {ShowComponent.add && <AddModal open={true} />}
          </div>
        </div>
        <div className="wildandfree">
            <>
          <form onSubmit={handleSubmit} >
                  
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
              <Typography className="w-1/3" component="div">
                {/* <Box className='dis' sx={{ bgcolor: '#123c69', textAlign: 'left', fontSize: 25, fontFamily:'Roboto, ',p:3, m:2 , color:'#edc7b7', borderRadius:3 }}>
                  <InputModal label=" Add Title " value={title} onChange={(e) => setTitle(e.target.value)} />
                  {title}
                </Box> */}
                <Box  className='dis' sx={{ bgcolor: '#123c69', width: 400,
                        height: 80,textAlign: 'left', ml: '5%',fontSize: 25, mt:'15%' ,
                        mb:-15.7,fontFamily:'Roboto, ',pr:3,pl:3 , color:'#edc7b7',borderRadius:3}}>
                    <InputModal label=" Add Title " value={title} onChange={(e) => setTitle(e.target.value)} maxlength={20} />
                  {title}
                </Box>
              </Typography>
              <Typography  className="w-1/3" component="div">
                {/* <Box  className='dis1' sx={{ bgcolor: '#edc7b7', 
                textAlign: 'left',fontSize: 25,fontFamily:'Roboto, ',p: 3 , m:2 , color:'#123c69',borderRadius:3}}>
                  <InputModal   label="Add Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                  {description}
                </Box> */}
                <Box  className='dis1' sx={{ bgcolor: '#edc7b7', width:400,
                      height: 510,textAlign: 'left', ml: '-30%' ,mt:'15%',
                      fontSize: 25, mb:15,fontFamily:'Roboto, ',p: 3 , color:'#123c69',borderRadius:3}}>
                    <InputModal   label="Add Description" value={description} onChange={(e) => setDescription(e.target.value)} maxlength={200}  />
                      {description}
                </Box>
              </Typography>
              </div>
              <div className="flex items-center justify-center">
                <ImageModal label="Add Image" onChange={(e) => {
                      setImage(e.target.files[0]);
                      setImagePreviewUrl(
                        URL.createObjectURL(e.target.files[0])
                      );
                    }}
                  />
                </div>
              </div>

          {image && (
            <>
              <div className="mx-auto flex justify-center">
                <img
                className='imdis'
                style={{ width: '40%', height: 400, marginLeft:'-55%', marginTop:-550, borderRadius: 10 }}
                // src={URL.createObjectURL(image)}
                // src={image}
                src={imagePreviewUrl}
                alt="React lost"/>
              </div>
            </>
          )}
            <br />
          <input className="inipini" type="submit" value="Submit" />
          </form>
          <br />
          {/* Display entered values */}

        </>
      </div>
      </div>
    </div>
  );
}

export default ImageSlider;
