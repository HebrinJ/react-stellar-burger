import Label from './label/label';
import style from './items-block.module.css';
import CatalogItem from '../catalog-item/catalog-item';
import { useSelector } from '../../../utils/hooks';

type TItemsBlockProps = {
    label: string;
    type: 'bun' | 'sauce' | 'main';
}

export default function ItemsBlock({label, type}: TItemsBlockProps): JSX.Element {
    const ingredientsData = useSelector(state => state.loading.allIngredients);    
    
    return (
        <>        
            <Label text={label} />
            <div className={style.typeBox}>
                {                    
                    ingredientsData?.map((element, index) => {
                        const id = String(index)+element._id;
                        if(element.type === type)
                            return (<CatalogItem key={id} ingredientData={element} />);
                    })}
            </div>        
        </>
    )
}