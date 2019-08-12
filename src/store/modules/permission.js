import ROLE from "@/resolver/role";

export default {
	state: {
		role: ROLE.guest,
	},
	mutations: {},
	actions: {
		switchRole({state}, role) {
			state.role = role;
		}
	}
};


