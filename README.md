### Awesome Custom Environment (ACE)
Contributors: Shane Rounce  
Tags: custom fields, block editor, dynamic content, WordPress  
Tested up to: 6.7  
Stable tag: 0.420.0  
License: GPL-2.0-or-later  
License URI: https://www.gnu.org/licenses/gpl-2.0.html  

Awesome Custom Environment (ACE) brings advanced custom field management to the WordPress block editor, enabling streamlined editing and enhanced content flexibility.

---

### Description

ACE offers a powerful solution for managing and rendering custom fields in the WordPress block editor, allowing users to define dropdowns, true/false fields, and other custom field types. Built with a modular architecture and supporting real-time updates, ACE provides an intuitive UI to set up custom fields, organize field groups, and dynamically display content based on user-defined options.

Key Features:
- **Custom Field Groups**: Easily create and manage field groups with support for dropdowns, true/false toggles, checkboxes, and radio buttons.
- **Dynamic Block Editor Integration**: Integrates field groups directly into the WordPress editor with customized settings for seamless editing.
- **Real-time Updates**: Uses AJAX for efficient, real-time updates to settings and field groups without page reloads.
- **REST API Support**: Provides custom REST API endpoints for fetching and rendering custom field data.
- **Role-Based Access**: Limit visibility and edit access based on user roles to ensure content integrity.
- **Post Type Assignment**: Associate field groups with specific post types for targeted content management.
- **Tagging System**: Organize field groups with tags for easy searching and filtering.
- **Pagination and Sorting**: Navigate field groups with pagination and sort options for efficient management.
- **UI Customization**: Adjust field group appearance using color pickers and styling options.
- **Custom Hooks**: Extend functionality through custom hooks for fetching and saving field data.
- **Error Handling and Optimization**: Enhanced error handling to improve reliability, especially for meta value updates.

---

### API Endpoints

ACE provides the following custom REST API endpoints:

- **GET /ace/v1/get-choices**: Retrieves available field choices.
- **POST /ace/v1/save-options**: Saves new or updated options.
- **POST /ace/v1/delete-option**: Deletes a specified option.
- **GET /ace/v1/roles**: Retrieves available user roles.

These endpoints streamline data retrieval and field management within the WordPress admin interface.

---

### Components

ACE includes modular React components designed for a seamless experience:

- **Settings Panel**: Central management interface for field groups and options.
- **OptionCards**: Displays individual field options for customization.
- **SideBar**: Provides sorting, filtering, and search capabilities for field groups.
- **SaveBar**: Manages the saving status and confirmation messages.
- **MainSettingsPanel**: The main component for configuring ACE settings and choices.

---

### State Management

ACE leverages React hooks for efficient state management:

- **useState**: Manages local component states.
- **useEffect**: Controls side effects, including data fetching and updating.
- **useReducer**: (If applicable) Manages complex state logic and field configurations.

These hooks ensure a cohesive data flow across components.

---

### Custom Hooks

ACE includes the following custom hooks to simplify component logic:

- **useFetchChoices**: Retrieves choices from the API, with built-in loading state.
- **useSaveOption**: Manages option saving to the API and updates the local state.

---

### Installation

1. Upload the plugin files to `/wp-content/plugins/ace-custom-environment` or install directly through the WordPress plugins screen.
2. Activate the plugin via the WordPress 'Plugins' screen.
3. Go to **Settings > ACE Fields** to begin configuring field groups and options.

---

### Frequently Asked Questions

**Q: How can I add a new dropdown group or true/false field?**  
A: Navigate to **Settings > ACE Fields** to create, edit, or delete custom field groups.

**Q: How do I assign specific roles to field groups?**  
A: When creating or editing a field group, use the 'Associated Roles' section to restrict access to certain user roles.

**Q: Can I associate field groups with specific post types?**  
A: Yes. Use the 'Associated Post Types' option when creating or editing field groups.

**Q: How can I search for field groups and options?**  
A: Use the search bar within **Settings > ACE Fields** to find specific fields and options.

---

### Screenshots

1. **Settings Screen**: Interface for managing custom field groups and options.
2. **Editor Integration**: Example of ACE field integration within the block editor.

---

### Changelog

**0.420.0**
- Initial beta release.
- Support for custom dropdown, checkbox, radio button, and true/false fields.
- Integration with WordPress REST API for dynamic content rendering.
- Real-time AJAX updates for field management.
- Modular settings interface with search, pagination, and sorting options.
- Tagging, role-based access, and post-type-specific field assignments.

---

### Additional Information

ACE empowers developers and content creators to build flexible, dynamic content workflows in WordPress by extending the block editor’s capabilities. Perfect for those looking to enhance the WordPress editing experience with custom field support.
