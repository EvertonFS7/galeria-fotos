import * as C from './styles'

type Props = {
    url: string
    name: string
    onDelete: (name: string) => void;
}

const PhotoItem = ({ url, name, onDelete }: Props) => {
    return (
        <C.Container>
            <img src={url} alt={name} />
            {name}
            <C.DeleteButton>
                <button onClick={() => onDelete(name)}>Excluir</button>
            </C.DeleteButton>
        </C.Container>
    )
}

export default PhotoItem
