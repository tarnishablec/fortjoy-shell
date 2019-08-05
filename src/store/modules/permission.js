import ROLE from "@/resolver/role";

export default {
	state: {
		role: ROLE.guest,
	},
	mutations: {
		switchRole(state, role) {
			state.role = role;
		}
	}
};


