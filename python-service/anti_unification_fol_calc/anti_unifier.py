from . import utils


# TODO: add counters for variables, constants, functions, and constants
def generalize(trees):
    if not 2 <= len(trees) <= 5:
        raise utils.CalculatorError(
            f'Generalizer requires between 2 and 5 trees, but received {len(trees)}.')

    # Function to generalize nodes across multiple trees
    def generalize_nodes(*nodes):
        first_type = nodes[0]['type']
        # Use getattr to handle missing value safely
        first_value = getattr(nodes[0], 'value', None)

        # Check if all nodes are of the same type and have the same value (if they have a value)
        if all(node['type'] == first_type and getattr(node, 'value', None) == first_value for node in nodes):
            if 'children' in nodes[0]:
                generalized_children = []
                # Use a generator expression to collect corresponding children from each node
                for child_group in zip(*(node['children'] for node in nodes if 'children' in node)):
                    generalized_children.append(generalize_nodes(*child_group))
                if first_value is not None:
                    return {'type': first_type, 'value': first_value, 'children': generalized_children}
                else:
                    return {'type': first_type, 'children': generalized_children}
            else:
                # Return the node structure based on whether it has a value
                return {'type': first_type, 'value': first_value} if first_value is not None else {'type': first_type}
        else:
            # Nodes differ, use a placeholder
            return {'type': 'VARIABLE', 'value': 'x'}

    # Start the generalization from the root nodes of each tree
    return generalize_nodes(*trees)
