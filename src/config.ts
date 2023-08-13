const config = {
    custom_id_regex: /^[a-zA-Z0-9-_]+$/, // The regex used to validate custom IDs,
    custom_id_length: 5, // The max length of the custom ID (defaults to 5 if not specified, null for no limit)
    generated_id_length: 5 // The length of the generated ID (defaults to 5 if not specified)
};

export default config;