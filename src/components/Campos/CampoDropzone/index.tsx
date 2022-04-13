import ImageUploading, { ImageListType } from "react-images-uploading";
import { GrUpdate } from "react-icons/gr";
import { MdSystemUpdateAlt } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { Alert, Button, ButtonGroup, Card, CardBody, CardFooter, CardImg } from "reactstrap";
import styled from "styled-components";
import { ReactNode } from "react";

interface CampoDropzoneProps {
  value: ImageListType;
  onChange: (value: ImageListType, addUpdatedIndex?: number[] | undefined) => void;
  maxNumber?: number;
  multiple?: boolean;
  maxFileSize?: number;
  acceptType?: string[];
}

export function CampoDropzone(props: CampoDropzoneProps) {
  return (
    <ImageUploading
      multiple={props.multiple}
      value={props.value}
      onChange={props.onChange}
      maxNumber={props.maxNumber}
      maxFileSize={props.maxFileSize}
      acceptType={props.acceptType}
    >
      {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps, errors }) => (
        <div className="upload__image-wrapper">
          <BotaoUploadEstilizado
            color="light"
            className="w-100"
            type="button"
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click ou Arraste imagens aqui <MdSystemUpdateAlt size={30} />
          </BotaoUploadEstilizado>
          &nbsp;
          <Button
            color="danger"
            type="button"
            className="mt-2"
            onClick={onImageRemoveAll}
          >Remover todas as imagens</Button>
          {errors && <div>
            {errors.maxNumber && <AlertErro>
              Numero maximo de imagems atingido. Maximo: {props.maxNumber}
            </AlertErro>}
            {errors.acceptType && <AlertErro>
              Tipo não aceito de imagem. Aceitos: {props.acceptType?.join(',')}
            </AlertErro>}
            {errors.maxFileSize && <AlertErro>
              Tamanho maximo de arquivo exedido. Tamanho maximo: {(props.maxFileSize) ? props.maxFileSize / 1000000 : 0} mb
            </AlertErro>}
            {/* {errors.resolution && <span>
              Selected file is not match your desired resolution
            </span>} */}
          </div>}
          <ListaImagem
            imageList={imageList}
            onImageRemove={onImageRemove}
            onImageUpdate={onImageUpdate}
          />
        </div>
      )}
    </ImageUploading>
  );
}

interface AlertErroProps {
  children: ReactNode;
}

function AlertErro(props: AlertErroProps) {
  return (
    <Alert color="danger" className="w-100" {...props}>{props.children}</Alert>
  );
}

interface ListaImagemBase {
  onImageUpdate: (index: number) => void;
  onImageRemove: (index: number) => void;
}

interface ListaImagemProps extends ListaImagemBase {
  imageList: ImageListType;
}

function ListaImagem(props: ListaImagemProps) {
  return (
    <>
      {/* <CardGroup> */}
      <div className="d-flex flex-row justify-content-center">
        {props.imageList.map((image, index) => (
          <ListaImagemItem
            key={index}
            dataURL={image.dataURL}
            onImageUpdate={props.onImageUpdate}
            onImageRemove={props.onImageRemove}
            index={index}
          />
        ))}
      </div>
      {/* </CardGroup> */}
    </>
  );
}

interface ListaImagemItemProps extends ListaImagemBase {
  dataURL?: string;
  index: number;
}

function ListaImagemItem(props: ListaImagemItemProps) {
  return (
    <CardEstilizado>
      <CardBody className="p-0 m-0 d-flex justify-content-center">
        <CardImgEstilizado src={props.dataURL} alt={`imagem-${props.index}`} />
      </CardBody>
      <CardFooter className="p-0 m-0">
        <ButtonGroup className="w-100">
          <Button
            className="ps-3 pe-3 pt-2 pb-2 d-flex justify-content-center align-items-center"
            color="primary"
            type="button"
            onClick={() => props.onImageUpdate(props.index)}
          >
            <GrUpdate size={20} className="p-0 m-0" />
          </Button>
          <Button
            className="ps-3 pe-3 pt-2 pb-2 d-flex justify-content-center align-items-center"
            color="danger"
            type="button"
            onClick={() => props.onImageRemove(props.index)}
          >
            <AiOutlineDelete size={20} className="p-0 m-0" />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </CardEstilizado>
  );
}

const BotaoUploadEstilizado = styled(Button)`
  height: 200px;
`;

const CardEstilizado = styled(Card)`
  width: 170px !important;
  margin: 5px !important;
  height: 210px !important;
`;

const CardImgEstilizado = styled(CardImg)`
  width: 170px !important;
  height: 170px !important;
`;

/*
import ImageUploading, { ImageListType } from "react-images-uploading";
import { GrUpdate } from "react-icons/gr";
import { MdSystemUpdateAlt } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { Alert, Button, ButtonGroup, Card, CardBody, CardFooter, CardImg } from "reactstrap";
import styled from "styled-components";

interface CampoDropzoneProps {
  value: ImageListType;
  onChange: (value: ImageListType, addUpdatedIndex?: number[] | undefined) => void;
  maxNumber?: number;
  multiple?: boolean;
  maxFileSize?: number;
  acceptType?: string[];
}
*/
export function CampoDropzone2(props: CampoDropzoneProps) {
  return (
    <ImageUploading
      multiple={props.multiple}
      value={props.value}
      onChange={props.onChange}
      maxNumber={props.maxNumber}
      maxFileSize={props.maxFileSize}
      acceptType={props.acceptType}
    >
      {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps, errors }) => (
        <div className="upload__image-wrapper">
          <BotaoUploadEstilizado
            color="light"
            className="w-100"
            type="button"
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click ou Arraste imagens aqui <MdSystemUpdateAlt size={30} />
          </BotaoUploadEstilizado>
          &nbsp;
          <Button
            color="danger"
            type="button"
            className="mt-2"
            onClick={onImageRemoveAll}
          >Remover todas as imagens</Button>
          {errors && <div>
            {errors.maxNumber && <Alert color="danger" className="w-100">
              Numero maximo de imagems atingido. Maximo: {props.maxNumber}
            </Alert>}
            {errors.acceptType && <Alert color="danger" className="w-100">
              Tipo não aceito de imagem. Aceitos: {props.acceptType?.join(',')}
            </Alert>}
            {errors.maxFileSize && <Alert color="danger" className="w-100">
              Tamanho maximo de arquivo exedido. Tamanho maximo: {(props.maxFileSize) ? props.maxFileSize / 1000000 : 0} mb
            </Alert>}
          </div>}
          <div className="d-flex flex-row justify-content-center">
            {imageList.map((image, index) => (
              <CardEstilizado key={index}>
                <CardBody className="p-0 m-0 d-flex justify-content-center">
                  <CardImgEstilizado src={image.dataURL} alt={`imagem-${index}`} />
                </CardBody>
                <CardFooter className="p-0 m-0">
                  <ButtonGroup className="w-100">
                    <Button
                      className="ps-3 pe-3 pt-2 pb-2 d-flex justify-content-center align-items-center"
                      color="primary"
                      type="button"
                      onClick={() => onImageUpdate(index)}
                    >
                      <GrUpdate size={20} className="p-0 m-0" />
                    </Button>
                    <Button
                      className="ps-3 pe-3 pt-2 pb-2 d-flex justify-content-center align-items-center"
                      color="danger"
                      type="button"
                      onClick={() => onImageRemove(index)}
                    >
                      <AiOutlineDelete size={20} className="p-0 m-0" />
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </CardEstilizado>
            ))}
          </div>
        </div>
      )}
    </ImageUploading>
  );
}
/*
  const BotaoUploadEstilizado = styled(Button)`
    height: 200px;
  `;

  const CardEstilizado = styled(Card)`
    width: 170px !important;
    margin: 5px !important;
    height: 210px !important;
  `;

  const CardImgEstilizado = styled(CardImg)`
    width: 170px !important;
    height: 170px !important;
  `;
*/