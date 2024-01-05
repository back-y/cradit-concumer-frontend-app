// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'

const resolveNavItemComponent = item => {
  if (item.sectionTitle) return VerticalNavSectionTitle

  return VerticalNavLink
}

const VerticalNavItems = props => {
  // ** Props
  const { verticalNavItems } = props

  const RenderMenuItems = verticalNavItems?.map((item, index) => {
    const TagName = resolveNavItemComponent(item)

    //   return <TagName {...props} key={index} item={item} />
    // })

    return item.isAllowed ? (
      <TagName {...props} key={index} item={item} />
    ) : (
      null
    );
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
