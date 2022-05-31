import {
  Accordion,
  Typography,
  Button,
  AccordionDetails,
  AccordionSummary,
  Box,
  ButtonGroup,
  Modal,
  Chip,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import Save from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Product,
  Categories,
  useProduct,
} from "../../contexts/product/ProductContext";
import { useParams } from "react-router-dom";

interface AdminPageAccordionProps {
  expanded?: boolean;
}

function EditProductCardAccordion({ expanded }: AdminPageAccordionProps) {
  const [open, setOpen] = useState(expanded ?? false);
  const [openModal, setOpenModal] = useState(false);

  let { id } = useParams();
  const { products, fetchProduct, updateProduct, deleteProduct } = useProduct();

  const product = products.find((item: Product) => item._id.toString() === id);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [fetchProduct]);

  useEffect(() => {
    if (id) {
      updateProduct(id);
    }
  }, [updateProduct]);

  useEffect(() => {
    if (id) {
      deleteProduct(id);
    }
  }, [deleteProduct]);

  const handleOpen = (
    event: React.SyntheticEvent<Element, Event>,
    expanded: boolean
  ) => setOpen(!open);

  return (
    <Accordion onChange={handleOpen} expanded={open}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            margin: "1rem 0",
          }}
        >
          <Box
            sx={{
              gap: "0.5rem",
              display: "flex",
              flexDirection: "row",
              bgcolor: "#fffff",
              borderColor: "#0EDFE6",
              color: " black",

              "@media screen and (max-width: 440px)": {
                flexDirection: "column",
              },
            }}
          >
            <img src={product?.imageUrl} width="48px" alt=""></img>
            {open ? (
              <>
                <input type="text" value={product?.name} />
                {!product?.name && (
                  <Typography sx={{ color: "red" }}>
                    Vänligen ange en titel.
                  </Typography>
                )}
              </>
            ) : (
              <Typography>{product?.name}</Typography>
            )}
          </Box>
          {open ? (
            <Button>Stäng</Button>
          ) : (
            <Box>
              <Button startIcon={<EditIcon />}>Redigera</Button>
            </Box>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ margin: "1rem 0" }}>
          <img
            style={{ width: 100, height: 100 }}
            src={product?.imageUrl}
            alt=""
          ></img>
        </Box>
        <Typography sx={{ marginBottom: "2ex" }}>Bild URL:&nbsp;</Typography>
        <input type="url" value={product?.imageUrl} />

        <Box>
          <Typography>Beskrivning</Typography>
          <textarea value={product?.details} />
          {!product?.details && (
            <Typography sx={{ color: "red" }}>
              Vänligen ange en beskrivning.
            </Typography>
          )}
          <Box sx={{ margin: "1rem 0" }}>
            <Typography>Redigera pris</Typography>
            <input type="number" min="1" value={product?.price} />
            {!product?.price && (
              <Typography>Vänligen ange ett pris.</Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ margin: "1rem 0" }}>
          <Typography>Redigera kategori</Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <ButtonGroup
              sx={{
                bgcolor: "#fffff",
                borderColor: "#0EDFE6",
                color: " black",

                "@media screen and (max-width: 440px)": {
                  flexDirection: "column",
                },
              }}
              aria-label="button group"
            >
              {Categories.map((category, index) => (
                <Button
                  key={index}
                  variant={
                    product?.category.includes(category)
                      ? "contained"
                      : "outlined"
                  }
                >
                  {category}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
          {!product?.category && (
            <Typography sx={{ color: "red" }}>
              Vänligen välj kategori.
            </Typography>
          )}
        </Box>
        <Box>
          <Button
            // disabled={!formValid}
            startIcon={<Save />}
            onClick={() => {
              updateProduct(id);
              setOpen(false);
            }}
          >
            Spara
          </Button>

          <Button
            startIcon={<DeleteForeverIcon />}
            onClick={() => setOpenModal(true)}
          >
            Ta bort produkt
          </Button>
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-name"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 250,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography>
                Är du säker på att du vill ta bort produkten?
              </Typography>
              <Button
                onClick={(e) => {
                  deleteProduct(id);
                  setOpenModal(false);
                  setOpen(false);
                  e.stopPropagation();
                }}
              >
                Ja
              </Button>
              <Button onClick={() => setOpenModal(false)}>Nej</Button>
            </Box>
          </Modal>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default EditProductCardAccordion;
