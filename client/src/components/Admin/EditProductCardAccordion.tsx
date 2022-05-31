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
import { useEffect, useReducer, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import Save from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Product, Categories } from "../../contexts/product/ProductContext";
import {
  ProductEditState,
  ProductEditAction,
  ProductEditReducer,
  ProductEditReducerType,
} from "../../contexts/Reducers";

function createProductEditState(product: Product): ProductEditState {
  const productEditState: ProductEditState = {
    ...product,
    nameValid: product.name !== "",
    informationValid: product.details !== "",
    categoryValid: product.category !== [],
    priceValid: !isNaN(product.price),
    imgURLValid: product.imageUrl !== "",
  };

  return productEditState;
}

const isProductEdited = (product: Product, productState: ProductEditState) =>
  productState.name !== product.name ||
  productState.details !== product.details ||
  productState.category !== product.category ||
  productState.price !== product.price ||
  productState.imageUrl !== product.imageUrl;

const isFormValid = (productState: ProductEditState) =>
  productState.nameValid &&
  productState.informationValid &&
  productState.categoryValid &&
  productState.priceValid &&
  productState.imgURLValid;

interface AdminPageAccordionProps {
  product: Product;
  expanded?: boolean;
  saveAction: (product: Product) => void;
  deleteAction: (productId: string) => void;
}

function EditProductCardAccordion({
  product,
  expanded,
  saveAction,
  deleteAction,
}: AdminPageAccordionProps) {
  const [open, setOpen] = useState(expanded ?? false);
  const [openModal, setOpenModal] = useState(false);

  const [productState, dispatch] = useReducer<
    React.Reducer<ProductEditState, ProductEditAction>
  >(ProductEditReducer, createProductEditState(product));

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    dispatch({
      type: ProductEditReducerType.Reset,
      payload: { product },
    });
  }, [product]);

  const handleOpen = (
    event: React.SyntheticEvent<Element, Event>,
    expanded: boolean
  ) => setOpen(!open);

  const formValid = isFormValid(productState);
  const matches = useMediaQuery("(max-width: 440px)");

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
            <img src={productState.imageUrl} width="48px" alt=""></img>
            {open ? (
              <>
                <input
                  type="text"
                  value={productState.name}
                  onChange={(e) => {
                    dispatch({
                      type: ProductEditReducerType.Update,
                      payload: { key: "name", value: e.target.value },
                    });
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                {!productState.nameValid && (
                  <Typography sx={{ color: "red" }}>
                    Vänligen ange en titel.
                  </Typography>
                )}
              </>
            ) : (
              <Typography>{productState.name}</Typography>
            )}
          </Box>
          {open ? (
            <Button>Stäng</Button>
          ) : (
            <Box>
              {isProductEdited(product, productState) ? (
                <Chip label="OSPARAD" variant="outlined" />
              ) : null}
              <Button startIcon={<EditIcon />}>Redigera</Button>
            </Box>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ margin: "1rem 0" }}>
          <img
            style={{ width: 100, height: 100 }}
            src={productState.imageUrl}
            alt=""
          ></img>
        </Box>
        <Typography sx={{ marginBottom: "2ex" }}>Bild URL:&nbsp;</Typography>
        <input
          type="url"
          value={productState.imageUrl}
          onChange={(e) => {
            dispatch({
              type: ProductEditReducerType.Update,
              payload: { key: "imageUrl", value: e.target.value },
            });
          }}
        />
        {!productState.imgURLValid && (
          <Typography sx={{ color: "red" }}>
            Vänligen ange en bildadress.
          </Typography>
        )}
        <Box>
          <Typography>Beskrivning</Typography>
          <textarea
            onChange={(e) => {
              dispatch({
                type: ProductEditReducerType.Update,
                payload: { key: "details", value: e.target.value },
              });
            }}
            value={productState.details}
          />
          {!productState.informationValid && (
            <Typography sx={{ color: "red" }}>
              Vänligen ange en beskrivning.
            </Typography>
          )}
          <Box sx={{ margin: "1rem 0" }}>
            <Typography>Redigera pris</Typography>
            <input
              type="number"
              min="1"
              value={!isNaN(productState.price) ? productState.price : ""}
              onChange={(e) => {
                const price = parseFloat(e.target.value);
                dispatch({
                  type: ProductEditReducerType.Update,
                  payload: {
                    key: "price",
                    value: price > 0 ? price : NaN,
                  },
                });
              }}
            />
            {!productState.priceValid && (
              <Typography>Vänligen ange ett pris.</Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ margin: "1rem 0" }}>
          <Typography>Redigera kategori</Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <ButtonGroup
              orientation={matches ? "vertical" : "horizontal"}
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
                    productState.category.includes(category)
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() =>
                    dispatch({
                      type: ProductEditReducerType.Update,
                      payload: { key: "category", value: category },
                    })
                  }
                >
                  {category}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
          {!productState.categoryValid && (
            <Typography sx={{ color: "red" }}>
              Vänligen välj kategori.
            </Typography>
          )}
        </Box>
        <Box>
          <Button
            disabled={!formValid}
            startIcon={<Save />}
            onClick={() => {
              saveAction(productState);
              setOpen(false);
            }}
          >
            Spara
          </Button>
          <Button
            disabled={!formValid}
            startIcon={<RestartAltIcon />}
            onClick={() =>
              dispatch({
                type: ProductEditReducerType.Reset,
                payload: { product: product },
              })
            }
          >
            Återställ
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
                  deleteAction(product._id);
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
