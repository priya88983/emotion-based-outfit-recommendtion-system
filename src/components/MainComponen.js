import OutfitCard from "./OutfitCard";
import Navbar from "./Navbar";
import * as faceapi from "face-api.js";
import WebcamModal from "./WebcamModal";
import { Bars } from "react-loader-spinner";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect, useCallback } from "react";
import { Box, Paper, Grid, Typography } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "10px",
}));

function MainComponent() {
  const [loader, setShowLoader] = useState(false);
  const [outfits, setOutfits] = useState([]);
  const [showOutfits, setShowOutfits] = useState(false);

  const [webcamModal, setWebcamModal] = useState(false);
  const [emotion, setEmotion] = useState();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [moodPrompt, setMoodPrompt] = useState("");

  const recommendOutfits = useCallback((mood) => {
    setEmotion(mood);
    setShowLoader(true);
    setShowOutfits(true);
    
    // Set mood-specific prompts
    const moodPrompts = {
      "Happy": "Wow, you're looking so beautiful today! You seem very happy, so here are some outfits to make you look even more radiant and confident! ✨",
      "Sad": "I can see you might be feeling a bit down. Let me suggest some outfits to lift up your mood and make you feel better! 💪",
      "Angry": "I sense some tension. Here are some calming and confident outfits to help you feel more centered and powerful! 🧘‍♀️",
      "Surprised": "You look pleasantly surprised! Let's find some exciting and bold outfits that match your adventurous spirit! 🎉",
      "Fearful": "I understand you might be feeling anxious. Here are some comfortable and reassuring outfits to help you feel safe and confident! 🛡️",
      "Disgusted": "I can see you're not feeling your best. Let me suggest some fresh and uplifting outfits to help you feel renewed! 🌟",
      "Neutral": "You have a calm, composed look! Here are some versatile and elegant outfits that will enhance your natural grace! ✨"
    };
    
    setMoodPrompt(moodPrompts[mood] || "Here are some great outfit suggestions for you!");
    
    // Simulate API call delay
    setTimeout(() => {
      setShowLoader(false);
      setOutfits(getOutfitRecommendations(mood));
    }, 2000);
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    if (!modelsLoaded) {
      loadModels();
    }
  }, [modelsLoaded]);

  useEffect(() => {
    if (emotion) {
      recommendOutfits(emotion);
    }
  }, [emotion, recommendOutfits]);


  const getOutfitRecommendations = (mood) => {
    const outfitDatabase = {
      "Happy": [
        {
          name: "Sunny Day Dress",
          description: "Bright yellow floral dress perfect for spreading joy",
          price: "89.99",
          image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
          link: "#"
        },
        {
          name: "Colorful Blazer Set",
          description: "Vibrant blazer with matching pants for a confident look",
          price: "129.99",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
          link: "#"
        },
        {
          name: "Joyful Jumpsuit",
          description: "Comfortable and stylish jumpsuit in cheerful colors",
          price: "79.99",
          image: "https://images.unsplash.com/photo-1571513723812-70a2b2a4b3f3?w=300&h=400&fit=crop",
          link: "#"
        }
      ],
      "Sad": [
        {
          name: "Comfort Hoodie Set",
          description: "Soft, cozy hoodie with matching joggers for comfort",
          price: "59.99",
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a4?w=300&h=400&fit=crop",
          link: "#"
        },
        {
          name: "Uplifting Sweater",
          description: "Warm, oversized sweater in calming colors",
          price: "69.99",
          image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&h=400&fit=crop",
          link: "#"
        },
        {
          name: "Gentle Cardigan",
          description: "Soft cardigan perfect for self-care days",
          price: "49.99",
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
          link: "#"
        }
      ],
      "Angry": [
        {
          name: "Power Suit",
          description: "Sharp, professional suit for commanding presence",
          price: "199.99",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
          link: "#"
        },
        {
          name: "Athletic Wear",
          description: "Comfortable workout gear for channeling energy",
          price: "89.99",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop",
          link: "#"
        },
        {
          name: "Structured Blazer",
          description: "Confident blazer for feeling empowered",
          price: "149.99",
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
          link: "#"
        }
      ],
      "Surprised": [
        {
          name: "Bold Statement Piece",
          description: "Eye-catching top with unique design",
          price: "79.99",
          image: "https://images.unsplash.com/photo-1571513723812-70a2b2a4b3f3?w=300&h=400&fit=crop",
          link: "#"
        },
        {
          name: "Adventure Jacket",
          description: "Versatile jacket for unexpected adventures",
          price: "119.99",
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a4?w=300&h=400&fit=crop",
          link: "#"
        },
        {
          name: "Dynamic Dress",
          description: "Flowing dress perfect for spontaneous moments",
          price: "99.99",
          image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
          link: "#"
        }
      ],
      "Fearful": [
        {
          name: "Comfortable Wrap",
          description: "Soft, enveloping wrap for security",
          price: "69.99",
          image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&h=400&fit=crop",
          link: "#"
        },
        {
          name: "Safe Space Sweater",
          description: "Oversized sweater for comfort and warmth",
          price: "59.99",
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
          link: "#"
        },
        {
          name: "Gentle Layers",
          description: "Layered look for added security",
          price: "89.99",
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a4?w=300&h=400&fit=crop",
          link: "#"
        }
      ],
      "Disgusted": [
        {
          name: "Fresh White Shirt",
          description: "Crisp, clean white shirt for a fresh start",
          price: "49.99",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
          link: "#"
        },
        {
          name: "Renewal Dress",
          description: "Light, airy dress for feeling refreshed",
          price: "79.99",
          image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
          link: "#"
        },
        {
          name: "Clean Minimalist Top",
          description: "Simple, elegant top for a clean slate",
          price: "39.99",
          image: "https://images.unsplash.com/photo-1571513723812-70a2b2a4b3f3?w=300&h=400&fit=crop",
          link: "#"
        }
      ],
      "Neutral": [
        {
          name: "Classic Blouse",
          description: "Timeless blouse for any occasion",
          price: "59.99",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
          link: "#"
        },
        {
          name: "Versatile Pants",
          description: "Comfortable pants that work everywhere",
          price: "69.99",
          image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&h=400&fit=crop",
          link: "#"
        },
        {
          name: "Elegant Cardigan",
          description: "Sophisticated cardigan for refined style",
          price: "89.99",
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
          link: "#"
        }
      ]
    };
    
    return outfitDatabase[mood] || outfitDatabase["Neutral"];
  };
  return (
    <div>
      <Navbar onMoodClick={() => setWebcamModal(true)} />
      
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h3" style={{ color: "white", marginBottom: "30px" }}>
          Mood Outfit Recommender
        </Typography>

        <Typography variant="h6" style={{ color: "#ccc", marginBottom: "40px" }}>
          Click "Your Current Mood" in the navbar to detect your emotion and get personalized outfit recommendations!
        </Typography>

      {/* Open Webcam and Capture emotion */}
      {webcamModal ? (
        <WebcamModal
          webcamModal={webcamModal}
          closeWebcamModal={() => setWebcamModal(false)}
          setEmotion={setEmotion}
          modelsLoaded={modelsLoaded}
        />
      ) : (
        <></>
      )}

      <div style={{ marginTop: "20px" }}>
        {emotion ? (
            <div style={{ color: "white", marginBottom: "20px" }}>
              <Typography variant="h5">Detected Mood: {emotion}</Typography>
            </div>
        ) : (
          <></>
        )}
          
          {moodPrompt && (
            <div style={{ 
              color: "#4CAF50", 
              marginBottom: "30px", 
              padding: "20px",
              backgroundColor: "rgba(76, 175, 80, 0.1)",
              borderRadius: "10px",
              maxWidth: "800px",
              margin: "0 auto 30px auto"
            }}>
              <Typography variant="h6">{moodPrompt}</Typography>
            </div>
          )}
          
        {loader ? (
          <div
            style={{
              display: "flex",
                flexDirection: "column",
              justifyContent: "center",
                alignItems: "center",
              marginTop: "50px",
            }}
          >
            <Bars
              height="80"
              width="80"
              color="#fff"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
              <Typography variant="h6" style={{ color: "white", marginTop: "20px" }}>
                Analyzing your mood and finding perfect outfits...
              </Typography>
          </div>
          ) : showOutfits ? (
          <Box sx={{ marginTop: "10px", padding: "20px" }}>
              <Typography variant="h4" style={{ color: "white", marginBottom: "30px" }}>
                Recommended Outfits
              </Typography>
            <Grid
              container
              spacing={3}
              style={{ display: "flex", justifyContent: "center" }}
            >
                {outfits &&
                  outfits.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Item>
                        <OutfitCard outfit={item} />
                    </Item>
                  </Grid>
                ))}
            </Grid>
          </Box>
        ) : (
          <></>
        )}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
