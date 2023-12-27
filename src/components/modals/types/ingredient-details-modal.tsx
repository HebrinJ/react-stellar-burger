import style from './ingredient-details-modal.module.css';
import { TIngredient } from '../../../utils/types-description';
import { useSelector } from '../../../utils/hooks';

type TIngredientDetailsProps = {
    id: string;
};

export default function IngredientDetailsModal({ id }: TIngredientDetailsProps): JSX.Element { 
    
    const label: string = 'Детали ингридиента';
    const data = useSelector(state => state.loading.allIngredients);

    const details = getDetails(id);
    
    function getDetails(id: string): TIngredient | undefined {
        return data.find(allItemsIds => allItemsIds._id === id);         
    }

    return (
        <div className={style.position}>
            <h1 className={style.header+ ' text text_type_main-large'}>{label}</h1>
            <img className={style.image} src={details?.image_large} alt={details?.name}></img>
            <p className={style.label+ ' text text_type_main-medium'}>{details?.name}</p>
            <div className={style.containerInfo}>
                <div className={style.detailsBlock}>
                    <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
                    <p className='text text_type_main-default text_color_inactive'>{details?.calories}</p>
                </div>
                <div className={style.detailsBlock}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{details?.proteins}</p>
                </div>
                <div className={style.detailsBlock}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{details?.fat}</p>
                </div>
                <div className={style.detailsBlock}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{details?.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}